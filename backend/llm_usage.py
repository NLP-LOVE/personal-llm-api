import datetime
from typing import Optional

from fastapi import APIRouter, Depends, Request
from pydantic import BaseModel, field_validator

from utils.util import get_before_timestamp, get_before_month, require_auth, get_before_day, get_current_timestamp
from utils.db_client import db_client

router = APIRouter(prefix="/backend/llm-usage", tags=["backend-llm-usage"])


class ChartBase(BaseModel):
    # 不能为空
    before_num: Optional[str]  # 可选字段
    unit_type: Optional[str]  # 可选字段

    @field_validator('unit_type')
    def validate_unit_type(cls, v):
        """时间单位格式验证"""
        if not v:
            v = 'day'
        if v not in ['day', 'month', 'year']:
            raise ValueError('时间单位必须是day或month或year')
        return v

    @field_validator('before_num')
    def validate_before_num(cls, v):
        """时间范围格式验证"""
        if not v:
            v = '7'
        try:
            v = int(v)
        except ValueError:
            raise ValueError('时间范围必须是整数')

        if v <= 0:
            raise ValueError('时间范围必须大于0')
        return v


def get_chart_params(before_num: Optional[str], unit_type: Optional[str]):
    return ChartBase(before_num=before_num, unit_type=unit_type)

def get_day_params(params):
    xAxis = []
    yAxis = []

    format_str = '%Y-%m-%d'
    for i in range(params.before_num - 1, -1, -1):
        time_stamp = get_before_timestamp(i)
        # 格式化time_stamp时间戳
        xAxis.append(datetime.datetime.fromtimestamp(time_stamp).strftime(format_str))
        yAxis.append(0)
    date_str = get_before_day(params.before_num - 1) + ' 00:00:00'
    search_column_name = 'create_day'

    return xAxis, yAxis, date_str, search_column_name

def get_month_params(params):
    xAxis = []
    yAxis = []
    format_str = '%Y-%m'
    for i in range(params.before_num - 1, -1, -1):
        month_str = get_before_month(i)

        xAxis.append(month_str)
        yAxis.append(0)
    date_str = get_before_month(params.before_num - 1) + ' 00:00:00'
    search_column_name = 'create_month'

    return xAxis, yAxis, date_str, search_column_name

def get_year_params(params):
    xAxis = []
    yAxis = []
    for i in range(params.before_num - 1, -1, -1):
        current_year = get_current_timestamp()[:4]

        xAxis.append(str(int(current_year) - i))
        yAxis.append(0)
    date_str = f'{int(current_year) - params.before_num + 1}-01-01 00:00:00'
    search_column_name = 'create_year'

    return xAxis, yAxis, date_str, search_column_name

@router.get("/chart-request")
@require_auth
async def chart_request(request: Request, params: ChartBase = Depends(get_chart_params)):

    xAxis = []
    yAxis = []

    if params.unit_type == 'day':
        xAxis, yAxis, date_str, search_column_name = get_day_params(params)

    elif params.unit_type == 'month':
        xAxis, yAxis, date_str, search_column_name = get_month_params(params)

    else:
        xAxis, yAxis, date_str, search_column_name = get_year_params(params)

    sql = f"""
        SELECT {search_column_name}, COUNT(*) AS count
        FROM llm_chat_history
        WHERE create_time >= '{date_str}'
        GROUP BY {search_column_name} order by {search_column_name}
    """

    res = await db_client.select(sql)
    res = [{search_column_name: item[search_column_name], 'count': item['count']} for item in res]

    for item in res:
        index = xAxis.index(item[search_column_name])
        if index != -1:
            yAxis[index] = item['count']

    data = {
        "tooltip": {
            "trigger": 'axis'
        },
        "title": {
            "text": '请求次数',
            "left": 'center',
            "bottom": '0%',
            "textStyle": {
                "fontSize": 14,
                "color": '#666'
            }
        },
        "xAxis": {
            "type": 'category',
            "data": xAxis
        },
        "yAxis": {
            "type": 'value',
            "axisLabel": {
                "formatter": '{value} 次'
            }
        },
        "series": [
            {
                "data": yAxis,
                "type": 'line',
                "smooth": True
            }
        ]
    }

    data = {'status': 0, 'msg': '', 'data': data}
    return data


@router.get("/chart-token")
@require_auth
async def chart_token(request: Request, params: ChartBase = Depends(get_chart_params)):

    xAxis = []
    yAxis_prompt = []
    yAxis_completion = []

    if params.unit_type == 'day':
        format_str = '%Y-%m-%d'
        for i in range(params.before_num - 1, -1, -1):
            time_stamp = get_before_timestamp(i)
            # 格式化time_stamp时间戳
            xAxis.append(datetime.datetime.fromtimestamp(time_stamp).strftime(format_str))
            yAxis_prompt.append(0)
            yAxis_completion.append(0)
        date_str = get_before_day(int(params.before_num) - 1) + ' 00:00:00'
        search_column_name = 'create_day'

    elif params.unit_type == 'month':
        format_str = '%Y-%m'
        for i in range(params.before_num - 1, -1, -1):
            month_str = get_before_month(i)

            xAxis.append(month_str)
            yAxis_prompt.append(0)
            yAxis_completion.append(0)
        date_str = get_before_month(params.before_num - 1) + ' 00:00:00'
        search_column_name = 'create_month'

    else:
        for i in range(params.before_num - 1, -1, -1):
            current_year = get_current_timestamp()[:4]

            xAxis.append(str(int(current_year) - i))
            yAxis_prompt.append(0)
            yAxis_completion.append(0)
        date_str = f'{int(current_year) - params.before_num + 1}-01-01 00:00:00'
        search_column_name = 'create_year'

    sql = f"""
        SELECT {search_column_name}, SUM(prompt_tokens) AS prompt_tokens, SUM(completion_tokens) AS completion_tokens
        FROM llm_chat_history
        WHERE create_time >= '{date_str}'
        GROUP BY {search_column_name} order by {search_column_name}
    """

    res = await db_client.select(sql)
    res = {item[search_column_name]: {'prompt_tokens': item['prompt_tokens'], 'completion_tokens': item['completion_tokens']} for item in res}

    for item in res:
        for i, name in enumerate(xAxis):
            if name in res:
                yAxis_prompt[i] = res[name]['prompt_tokens']
                yAxis_completion[i] = res[name]['completion_tokens']

    data = {
        "tooltip": {
            "trigger": 'axis'
        },
        "legend": {
            "data": ['输入Token', '输出Token']
        },
        "title": {
            "text": 'Token消耗',
            "left": 'center',
            "bottom": '0%',
            "textStyle": {
                "fontSize": 14,
                "color": '#666'
            }
        },
        "xAxis": {
            "type": 'category',
            "data": xAxis
        },
        "yAxis": {
            "type": 'value',
            "axisLabel": {
                "formatter": '{value} token'
            }
        },
        "series": [
            {
                "name": '输入Token',
                "data": yAxis_prompt,
                "type": 'line',
                "smooth": True
            },
            {
                "name": '输出Token',
                "data": yAxis_completion,
                "type": 'line',
                "smooth": True
            }
        ]
    }

    data = {'status': 0, 'msg': '', 'data': data}
    return data


@router.get("/chart-money")
@require_auth
async def chart_money(request: Request, params: ChartBase = Depends(get_chart_params)):

    xAxis = []
    yAxis = []

    if params.unit_type == 'day':
        xAxis, yAxis, date_str, search_column_name = get_day_params(params)

    elif params.unit_type == 'month':
        xAxis, yAxis, date_str, search_column_name = get_month_params(params)

    else:
        xAxis, yAxis, date_str, search_column_name = get_year_params(params)

    sql = f"""
        SELECT {search_column_name}, SUM(input_price) AS input_price, SUM(output_price) AS output_price
        FROM llm_chat_history
        WHERE create_time >= '{date_str}'
        GROUP BY {search_column_name} order by {search_column_name}
    """

    res = await db_client.select(sql)
    res = {item[search_column_name]: {'price': item['input_price'] + item['output_price']} for item in res}

    for item in res:
        for i, name in enumerate(xAxis):
            if name in res:
                yAxis[i] = res[name]['price']

    data = {
        "tooltip": {
            "trigger": 'axis'
        },
        "title": {
            "text": '消费金额',
            "left": 'center',
            "bottom": '0%',
            "textStyle": {
                "fontSize": 14,
                "color": '#666'
            }
        },
        "xAxis": {
            "type": 'category',
            "data": xAxis
        },
        "yAxis": {
            "type": 'value',
            "axisLabel": {
                "formatter": '{value} 元'
            }
        },
        "series": [
            {
                "data": yAxis,
                "type": 'line',
                "smooth": True
            }
        ]
    }

    data = {'status': 0, 'msg': '', 'data': data}
    return data