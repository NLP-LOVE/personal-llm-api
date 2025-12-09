import json
import time

import httpx

from utils.util import snowflake, get_current_timestamp
from utils.mysql_client import db_client
from utils.logger import Logger

# 供应商模型接口基类
class LLMService(object):

    def __init__(self, id, base_url, model_id, api_key, provider_english_name, model_name, input_unit_price, output_unit_price):
        self.id = id
        self.base_url_response = base_url + '/responses' if base_url[-1] != '/' else base_url + 'responses'
        self.chat_url = base_url + '/chat/completions' if base_url[-1] != '/' else base_url + 'chat/completions'
        self.base_url = base_url if base_url[-1] != '/' else base_url[:-1]
        self.model_id = model_id
        self.model_name = model_name
        self.key = api_key
        self.provider_english_name = provider_english_name
        self.input_unit_price = input_unit_price
        self.output_unit_price = output_unit_price

        self.headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + self.key
        }

        self.stream_headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + self.key,
            "Accept": "text/event-stream",  # 表明客户端接受事件流
            "Cache-Control": "no-cache",  # 禁用缓存
            "Connection": "keep-alive"  # 保持长连接
        }


    async def create_history(self, params):
        history = {}
        history['id'] = snowflake.next_id()
        context = params['messages'] + params['tools'] if 'tools' in params else params['messages']
        history['context'] = json.dumps(context, ensure_ascii=False)
        history['prompt'] = params['messages'][-1]['content']
        history['provider_name'] = self.provider_english_name
        history['model_name'] = self.model_name
        history['model_id'] = self.model_id
        current_timestamp = get_current_timestamp()
        history['create_time'] = current_timestamp[0:-4]
        history['create_day'] = current_timestamp[0:10]
        history['create_month'] = current_timestamp[0:7]
        history['create_year'] = current_timestamp[0:4]

        await db_client.insert('llm_chat_history', history)
        return history

    async def update_tokens(self, history, response):
        # 更新tokens
        reasoning_content = response['choices'][0]['message'].get('reasoning_content', '')
        if reasoning_content:
            reasoning_content = f'<think>\n{reasoning_content}\n</think>\n'

        update_data = {}
        if response['usage']:
            update_data['completion_tokens'] = response['usage']['completion_tokens']
            update_data['prompt_tokens'] = response['usage']['prompt_tokens']
            update_data['input_price'] = self.input_unit_price * (response['usage']['prompt_tokens'] / 1000)
            update_data['output_price'] = self.output_unit_price * (response['usage']['completion_tokens'] / 1000)
        else:
            update_data['completion_tokens'] = 0
            update_data['prompt_tokens'] = 0
            update_data['input_price'] = 0
            update_data['output_price'] = 0

        if not response['choices'][0]['message']['content']:
            response['choices'][0]['message']['content'] = ''
        update_data['answer'] = reasoning_content + response['choices'][0]['message']['content']
        # tool calls
        if 'tool_calls' in response['choices'][0]['message']:
            update_data['answer'] += json.dumps(response['choices'][0]['message']['tool_calls'], ensure_ascii=False, indent=4)
        current_timestamp = get_current_timestamp()
        update_data['update_time'] = current_timestamp[0:-4]

        await db_client.update('llm_chat_history', update_data, f'id={history["id"]}')


    async def chat(self, params):
        id = params.get('id', '')
        if id:
            del params['id']
        else:
            id = snowflake.next_id()

        history = await self.create_history(params)
        logger = Logger(self.provider_english_name, id)
        logger.info(f"chat start")

        # httpx异步请求
        params['model'] = self.model_id
        async with httpx.AsyncClient() as client:
            response = await client.post(self.chat_url, json=params, headers=self.headers, timeout=600)

        response = response.json()

        # 拿到结果
        answer = response['choices'][0]['message']['content']
        reasoning_content = response['choices'][0]['message'].get('reasoning_content', '')

        # usage
        if not response.get('usage', {}):
            usage = await self.get_usage(response, params, f'{reasoning_content}\n{answer}')
            response['usage'] = usage

        await self.update_tokens(history, response)

        logger.info(f"chat end")
        return response


    async def chat_stream(self, params):
        id = params.get('id', '')
        if id:
            del params['id']
        else:
            id = snowflake.next_id()

        history = await self.create_history(params)
        logger = Logger(self.provider_english_name, id)
        logger.info(f"chat start")


        # httpx异步请求
        usage = None
        content = []
        reasoning_content = []
        params['model'] = self.model_id
        async with httpx.AsyncClient(timeout=600) as client:
            async with client.stream("POST", self.chat_url, json=params, headers=self.stream_headers) as response:

                async for line in response.aiter_lines():
                    chunk = line.strip()
                    if not chunk:
                        continue  # 跳过空行
                    chunk = chunk[6:]
                    if chunk == '[DONE]':
                        continue  # 跳过空行

                    try:
                        chunk = json.loads(chunk)
                        if 'choices' not in chunk:
                            print(chunk)
                            continue
                    except Exception as e:
                        continue

                    if 'usage' not in chunk:
                        chunk['usage'] = None
                    if chunk['usage']:
                        usage = chunk['usage']

                    if chunk['choices']:
                        if 'content' not in chunk['choices'][0]['delta']:
                            chunk['choices'][0]['delta']['content'] = ''
                        if chunk['choices'][0]['delta']['content']:
                            content.append(chunk['choices'][0]['delta']['content'])
                        if chunk['choices'][0]['delta'].get('reasoning_content', ''):
                            reasoning_content.append(chunk['choices'][0]['delta']['reasoning_content'])
                        if chunk['choices'][0]['delta'].get('reasoning', ''):
                            reasoning_content.append(chunk['choices'][0]['delta']['reasoning'])

                        if chunk['choices'][0].get('finish_reason', '') == 'stop':
                            chunk['choices'][0]['finish_reason'] = None

                            if chunk['choices'][0].get('id', ''):
                                params['id'] = chunk['choices'][0]['id']

                    yield chunk



        if not usage:
            usage = await self.get_usage({'usage': usage}, params, f"{''.join(reasoning_content)}\n{''.join(content)}")

        # finishe
        templace = {"choices": [{"delta": {"content": "", "role": "assistant"}, "index": 0, "finish_reason": 'stop'}],
                    "created": int(time.time()), "id": str(history['id']), "model": self.model_id,
                    "service_tier": "default", "object": "chat.completion.chunk", "usage": usage}

        yield templace

        # 记录数据
        response = {'id': history['id'],
                    'choices': [{'message': {
                        "role": "assistant",
                        'content': ''.join(content)
                    }}],
                    'usage': usage,
                    "created": int(time.time()), "model": self.model_id, "object": "chat.completion"
                    }
        if reasoning_content:
            response['choices'][0]['message']['reasoning_content'] = ''.join(reasoning_content)

        await self.update_tokens(history, response)
        logger.info(f"chat end")


    # response LLM接口
    async def chat_stream_response(self, params):
        id = params.get('id', '')
        if id:
            del params['id']

        history = await self.create_history(params)
        logger = Logger(self.provider_english_name, id)
        logger.info(f"chat start")

        # 处理messages参数
        params['model'] = self.model_id
        input_params = params.copy()
        input_params['input'] = input_params['messages']
        del input_params['messages']
        if 'stream_options' in input_params:
            del input_params['stream_options']

        # httpx异步请求
        usage = None
        content = []
        reasoning_content = []
        templace = {"choices": [{"delta": {"content": "", "role": "assistant"}, "index": 0}], "created": int(time.time()), "id": str(history['id']), "model": self.model_id, "service_tier": "default", "object": "chat.completion.chunk", "usage": None}
        async with httpx.AsyncClient(timeout=600) as client:
            async with client.stream("POST", self.base_url_response, json=input_params, headers=self.stream_headers) as response:

                async for line in response.aiter_lines():
                    chunk = line.strip()
                    if not chunk:
                        continue  # 跳过空行
                    chunk = chunk[6:]
                    if chunk[-1] != '}':
                        continue  # 跳过空行

                    chunk = json.loads(chunk)

                    if chunk.get('usage', ''):
                        usage = chunk['usage']

                    if not chunk.get('delta', ''):
                        continue

                    if chunk['type'] == 'response.output_text.delta':
                        if 'reasoning_content' in templace['choices'][0]['delta']:
                            del templace['choices'][0]['delta']['reasoning_content']
                        templace['choices'][0]['delta']['content'] = chunk['delta']
                        content.append(chunk['delta'])

                    yield templace

        if not usage:
            usage = await self.get_usage({'usage': usage}, params, f"{''.join(reasoning_content)}\n{''.join(content)}")
        else:
            usage = {'completion_tokens': usage['output_tokens'], 'prompt_tokens': usage['input_tokens'], 'total_tokens': usage['total_tokens']}

        # finishe
        templace = {"choices": [{"delta": {"content": "", "role": "assistant"}, "index": 0, "finish_reason": 'stop'}],
                    "created": int(time.time()), "id": str(history['id']), "model": self.model_id,
                    "service_tier": "default", "object": "chat.completion.chunk", "usage": usage}

        yield templace

        # 记录数据
        response = {'id': history['id'],
                    'choices': [{'message': {
                        "role": "assistant",
                        'content': ''.join(content)
                    }}],
                    'usage': usage,
                    "created": int(time.time()), "model": self.model_id, "object": "chat.completion"
                    }
        if reasoning_content:
            response['choices'][0]['message']['reasoning_content'] = ''.join(reasoning_content)

        await self.update_tokens(history, response)
        logger.info(f"chat end")


    # 获取usage
    async def get_usage(self, response, params, answer):
        if response['usage']:
            return {'completion_tokens': response['usage']['completion_tokens'], 'prompt_tokens': response['usage']['prompt_tokens'], 'total_tokens': response['usage']['total_tokens']}
        else:
            return {'completion_tokens': 0, 'prompt_tokens': 0, 'total_tokens': 0}
