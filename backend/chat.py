
import json

from fastapi import APIRouter, Depends, Request

from utils.util import require_auth, PaginationParams, get_page_params
from utils.mysql_client import db_client

router = APIRouter(prefix="/backend/chat", tags=["chat"])

@router.get("/chat-history")
@require_auth
async def chat_history(request: Request, params: PaginationParams = Depends(get_page_params)):
    # 分页查询

    sql = f"""SELECT * FROM llm_chat_history where ORDER BY id DESC LIMIT {(params.page - 1) * params.perPage},{params.perPage}"""

    data_list = await db_client.select(sql)

    res = []
    i = -1
    for item in data_list:
        i += 1
        res.append(item)

        item['prompt'] = item['prompt'][:40] + '...'
        item['id'] = i + 1 + (params.page - 1) * params.perPage
        item['input_price'] = "{0:.15f}".format(item['input_price']).rstrip('0').rstrip('.')
        item['output_price'] = "{0:.15f}".format(item['output_price']).rstrip('0').rstrip('.')

        item['prompt_tokens'] = f"{item['prompt_tokens']} / {item['input_price']}元"
        item['completion_tokens'] = f"{item['completion_tokens']} / {item['output_price']}元"
        item['context'] = json.loads(item['context'])
        item['context'].append({'role': 'assistant', 'content': item['answer']})
        if item['update_time'] and item['create_time']:
            item['duration'] = str(int((item['update_time'] - item['create_time']).total_seconds())) + ' s'
        item['create_time'] = item['create_time'].strftime('%Y-%m-%d %H:%M:%S')

        for context_item in item['context']:
            if 'content' in context_item and context_item['content']:
                if '<think>' in context_item['content']:
                    context_item['content'] = context_item['content'].replace('<think>', '\n## <think>\n').replace('</think>', '\n## </think>\n')

                # 处理多模态
                if isinstance(context_item['content'], list):
                    context_list = []
                    for obj in context_item['content']:
                        if 'text' in obj:
                            context_list.append(obj['text'])
                        elif 'image_url' in obj:
                            context_list.append(f'![image]({obj["image_url"]["url"]})')
                    context_item['content'] = '\n\n\n'.join(context_list)

            elif 'tool_calls' in context_item:
                context_item['content'] = json.dumps(context_item['tool_calls'], ensure_ascii=False, indent=4)
            elif 'function' in context_item:
                context_item['role'] = 'function'
                context_item['content'] = json.dumps(context_item['function'], ensure_ascii=False, indent=4)

    sql = 'select count(1) as cou from llm_chat_history'
    total = await db_client.select(sql)
    total = total[0]['cou']

    data = {'status':0, 'msg':'', 'data':{'count':total, 'rows':res}}
    return data

