from typing import Union

from fastapi import APIRouter, Depends, Request
from pydantic import BaseModel, validator

from utils.util import snowflake, get_current_timestamp, require_auth, PaginationParams, get_page_params
from utils.mysql_client import db_client
from init import init_models

router = APIRouter(prefix="/backend/api-manage", tags=["api-manage"])

class ProviderBase(BaseModel):
    provider_name: str
    provider_english_name: str
    api_key: str
    base_url: str

    @validator('provider_name')
    def validate_provider_name(cls, value):
        if not value:
            raise ValueError('供应商名称不能为空')
        return value

    @validator('provider_english_name')
    def validate_provider_english_name(cls, value):
        if not value:
            raise ValueError('供应商英文名称不能为空')
        return value

    @validator('api_key')
    def validate_api_key(cls, value):
        if not value:
            raise ValueError('api key不能为空')
        return value

    @validator('base_url')
    def validate_base_url(cls, value):
        if not value:
            raise ValueError('base url不能为空')
        return value

# 创建供应商
@router.post("/provider/create")
@require_auth
async def provider_create(request: Request, params: ProviderBase):

    # 判断供应商名称是否存在
    sql = f'select * from llm_provider where provider_name = "{params.provider_name}"'
    result = await db_client.select(sql)
    if result:
        return {"status": 1, "msg": "供应商名称已存在", "data": {}}

    data = {}
    data['id'] = snowflake.next_id()
    data['provider_name'] = params.provider_name
    data['provider_english_name'] = params.provider_english_name
    data['api_key'] = params.api_key
    data['base_url'] = params.base_url
    current_timestamp = get_current_timestamp()
    data['create_time'] = current_timestamp[:-4]
    data['update_time'] = current_timestamp[:-4]
    
    await db_client.insert('llm_provider', [data])
    return {"status": 0, "msg": "创建成功", "data": {}}

# 获取供应商列表
@router.get("/provider/list")
@require_auth
async def provider_list(request: Request, params: PaginationParams = Depends(get_page_params)):

    sql = f'select * from llm_provider order by id desc limit {(params.page - 1) * params.perPage},{params.perPage}'
    result = await db_client.select(sql)
    for i, item in enumerate(result):
        item['row_id'] = i + 1 + (params.page - 1) * params.perPage
        item['id'] = str(item['id'])
        item['create_time'] = item['create_time'].strftime('%Y-%m-%d %H:%M:%S')

    sql = 'select count(*) as cou from llm_provider'
    total = await db_client.select(sql)
    total = total[0]['cou']

    data = {'status':0, 'msg':'', 'data':{'count':total, 'rows':result}}
    return data

# 更新供应商
@router.post("/provider/update")
@require_auth
async def provider_update(request: Request, params: ProviderBase):

    # 获取参数
    request_data = await request.json()
    if not request_data.get('id', None):
        return {"status": 1, "msg": "错误！", "data": {}}
    
    current_timestamp = get_current_timestamp()

    sql = 'update llm_provider set '+ \
        f'provider_name="{params.provider_name}",'+ \
        f'provider_english_name="{params.provider_english_name}",'+ \
        f'api_key="{params.api_key}",'+ \
        f'base_url="{params.base_url}",'+ \
        f'update_time="{current_timestamp}"'+ \
        f' where id={request_data["id"]}'
    await db_client.execute(sql)

    return {"status": 0, "msg": "更新成功", "data": {}}



class ModelBase(BaseModel):
    provider_english_name: str
    model_name: str
    model_id: str
    input_unit_price: Union[str, int, float]
    output_unit_price: Union[str, int, float]


    @validator('provider_english_name')
    def validate_provider_english_name(cls, value):
        if not value:
            raise ValueError('供应商英文名称不能为空')
        return value

    @validator('model_name')
    def validate_model_name(cls, value):
        if not value:
            raise ValueError('模型名称不能为空')
        return value

    @validator('model_id')
    def validate_model_id(cls, value):
        if not value:
            raise ValueError('模型id不能为空')
        return value

    @validator('input_unit_price')
    def validate_input_unit_price(cls, value):
        if isinstance(value, int) or isinstance(value, float):
            value = str(value)

        if not value:
            raise ValueError('输入单价不能为空')
        try:
            float(value)
        except:
            raise ValueError('输入单价必须为数字')
        return value

    @validator('output_unit_price')
    def validate_output_unit_price(cls, value):
        if isinstance(value, int) or isinstance(value, float):
            value = str(value)

        if not value:
            raise ValueError('输出单价不能为空')
        try:
            float(value)
        except:
            raise ValueError('输出单价必须为数字')
        return value

@router.post("/model/create")
@require_auth
async def model_create(request: Request, params: ModelBase):

    data = {}
    data['id'] = snowflake.next_id()
    data['provider_english_name'] = params.provider_english_name
    data['model_name'] = params.model_name
    data['model_id'] = params.model_id
    data['input_unit_price'] = params.input_unit_price
    data['output_unit_price'] = params.output_unit_price
    data['status'] = 1
    current_timestamp = get_current_timestamp()
    data['create_time'] = current_timestamp[:-4]
    data['update_time'] = current_timestamp[:-4]
    
    await db_client.insert('llm_model', data)
    await init_models()
    return {"status": 0, "msg": "创建成功", "data": {}}


@router.get("/model/list")
@require_auth
async def model_list(request: Request, params: PaginationParams = Depends(get_page_params)):

    page = int(params.page)
    page_size = int(params.perPage)
    sql = f'select * from llm_model order by id desc limit {(page - 1) * page_size},{page_size}'
    result = await db_client.select(sql)
    for i, item in enumerate(result):
        item['row_id'] = i + 1 + (page - 1) * page_size
        item['id'] = str(item['id'])
        item['status'] = True if item['status'] == 1 else False
        item['create_time'] = item['create_time'].strftime('%Y-%m-%d %H:%M:%S')

    sql = 'select count(*) as cou from llm_model'
    total = await db_client.select(sql)
    total = total[0]['cou']

    data = {'status':0, 'msg':'', 'data':{'count':total, 'rows':result}}
    return data


@router.post("/model/update")
@require_auth
async def model_update(request: Request, params: ModelBase):
    # 获取参数
    request_data = await request.json()
    if not request_data.get('id', None):
        return {"status": 1, "msg": "错误！", "data": {}}

    status = 0 if not request_data.get('status', None) else 1
    current_timestamp = get_current_timestamp()[:-4]

    sql = 'update llm_model set '+ \
        f'provider_english_name="{params.provider_english_name}",'+ \
        f'model_name="{params.model_name}",'+ \
        f'model_id="{params.model_id}",'+ \
        f'input_unit_price={params.input_unit_price},'+ \
        f'output_unit_price={params.output_unit_price},'+ \
        f'status={status},'+ \
        f'update_time="{current_timestamp}"'+ \
        f' where id={request_data["id"]}'
    await db_client.execute(sql)
    
    await init_models()
    return {"status": 0, "msg": "修改成功", "data": {}}


@router.get("/model/update-status")
@require_auth
async def model_update_status(request: Request):
    # 获取参数
    request_data = request.query_params._dict
    if not request_data.get('id', None):
        return {"status": 1, "msg": "错误！", "data": {}}

    # 查询模型状态
    sql = f"select status from llm_model where id={request_data['id']}"
    result = await db_client.select(sql)
    if not result:
        return {"status": 1, "msg": "模型不存在！", "data": {}}

    status = 0 if result[0]['status'] == 1 else 1
    current_timestamp = get_current_timestamp()[:-4]

    # 更新模型状态
    sql = f"update llm_model set status={status}, update_time=\"{current_timestamp}\" where id={request_data['id']}"
    await db_client.execute(sql)

    await init_models()
    return {"status": 0, "msg": "修改成功", "data": {}}


