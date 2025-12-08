
from loguru import logger

from service.byte_llm import ByteLLMService
from service.llm_service import LLMService
from service.open_router_llm import OpenRouterLLMService
from service.qwen_llm import QwenLLMService
from utils.mysql_client import MysqlClient
from config import settings

# 初始化数据库
async def init_db():
    db_client = MysqlClient(settings.MYSQL_HOST, settings.MYSQL_PORT, settings.MYSQL_USER, settings.MYSQL_PASSWORD, settings.MYSQL_DATABASE)

    # 先查询是否已经初始化过
    sql = 'SELECT 1 FROM information_schema.tables WHERE table_name = "llm_provider"'
    result = await db_client.select(sql)
    if not result:
        logger.info('数据库未初始化，开始初始化')

        # 读取sql文件
        with open('init.sql', 'r', encoding='utf-8') as f:
            sql = f.read()
        await db_client.execute(sql)

        logger.info('数据库初始化完成')

    db_client.pool.close()
    await db_client.pool.wait_closed()


MODELS_OBJ = {'models_dict': {}, 'models_dict_num': {}}

# 初始化模型
async def init_models():
    models_dict = {}
    models_dict_num = {}

    # 1. 查询模型和key
    sql = 'select * from llm_model ' + \
          'left join llm_provider on llm_provider.provider_english_name=llm_model.provider_english_name ' + \
          'where status=1 and llm_provider.provider_name is not null'

    db_client = MysqlClient(settings.MYSQL_HOST, settings.MYSQL_PORT, settings.MYSQL_USER, settings.MYSQL_PASSWORD, settings.MYSQL_DATABASE)
    models_list = await db_client.select(sql)

    # 2. 创建模型字典
    for model in models_list:
        params = {}
        params['id'] = model['id']
        params['base_url'] = model['base_url']
        params['model_id'] = model['model_id']
        params['api_key'] = model['api_key']
        params['provider_english_name'] = model['provider_english_name']
        params['model_name'] = model['model_name']
        params['input_unit_price'] = model['input_unit_price']
        params['output_unit_price'] = model['output_unit_price']

        if model['provider_english_name'] == 'byte_dance':
            llm_service = ByteLLMService(**params)

        elif model['provider_english_name'] == 'qwen':
            llm_service = QwenLLMService(**params)

        elif model['provider_english_name'] == 'open_router':
            llm_service = OpenRouterLLMService(**params)

        else:
            llm_service = LLMService(**params)

        if model['model_name'] not in models_dict:
            models_dict[model['model_name']] = [llm_service]
            models_dict_num[model['model_name']] = 0
        else:
            models_dict[model['model_name']].append(llm_service)

    MODELS_OBJ['models_dict'] = models_dict
    MODELS_OBJ['models_dict_num'] = models_dict_num

    db_client.pool.close()
    await db_client.pool.wait_closed()

    logger.info(f'模型接口初始化完成，共初始化{len(models_dict)}个模型接口')

# 获取模型
def get_model(model_name):
    if model_name not in MODELS_OBJ['models_dict']:
        return None
    else:
        # 如果有相同的模型，则轮询模型，选择一个模型
        MODELS_OBJ['models_dict_num'][model_name] += 1
        return MODELS_OBJ['models_dict'][model_name][MODELS_OBJ['models_dict_num'][model_name] % len(MODELS_OBJ['models_dict'][model_name])]
