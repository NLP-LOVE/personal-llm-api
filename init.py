
from loguru import logger

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


