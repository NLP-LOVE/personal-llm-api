import os
import sys
import asyncio

import pandas as pd
import aiomysql
from config import settings

# 添加上层目录
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

class MysqlClient(object):
    def __init__(self, host, port, user, password, database):
        self.ip = host
        self.port = port
        self.user = user
        self.password = password
        self.database = database

        self.pool = None

    async def init_pool(self):
        """异步初始化连接池"""
        if self.pool is None:
            self.pool = await aiomysql.create_pool(host=self.ip, port=self.port, user=self.user, password=self.password, db=self.database)

    async def select(self, sql):
        if self.pool is None:
            await self.init_pool()
        data = []
        async with self.pool.acquire() as conn:
            async with conn.cursor() as cur:
                await cur.execute(sql)
                columns = [column[0] for column in cur.description]
                result = await cur.fetchall()
                data = [dict(zip(columns, row)) for row in result]

        return data

    async def execute(self, sql):
        if self.pool is None:
            await self.init_pool()
        async with self.pool.acquire() as conn:
            async with conn.cursor() as cur:
                await cur.execute(sql)
                await conn.commit()

    async def update(self, table_name, data:dict, where):
        if self.pool is None:
            await self.init_pool()

        async with self.pool.acquire() as conn:
            async with conn.cursor() as cur:
                if where:
                    update_query = f'UPDATE {table_name} SET {", ".join([f"{key} = %s" for key in data.keys()])} WHERE {where}'
                else:
                    update_query = f'UPDATE {table_name} SET {", ".join([f"{key} = %s" for key in data.keys()])}'
                await cur.execute(update_query, list(data.values()))
                await conn.commit()

    # data 可以是 DataFrame 或 list of dict
    async def insert(self, table_name, data):
        if isinstance(data, pd.DataFrame):
            if len(data) == 0:
                return None
            data = data.to_dict(orient='records')

        if not data:
            return None

        if isinstance(data, dict):
            data = [data]

        if not isinstance(data, list):
            return None

        if self.pool is None:
            await self.init_pool()
        async with self.pool.acquire() as conn:
            async with conn.cursor() as cur:
                columns = ', '.join(data[0].keys())
                placeholders = ', '.join(['%s'] * len(data[0]))
                insert_query = f'INSERT INTO {table_name} ({columns}) VALUES ({placeholders})'
                await cur.executemany(insert_query, [tuple(item.values()) for item in data])
                await conn.commit()

db_client = MysqlClient(settings.MYSQL_HOST, settings.MYSQL_PORT, settings.MYSQL_USER, settings.MYSQL_PASSWORD, settings.MYSQL_DATABASE)

async def main():
    # sql = 'update blog_num set num = 102 where id = 1'
    # await client.execute(sql)

    data = [{
        'blog_name': 'test',
        'create_time': '2023-01-01',
        'num': 100
    },
        {
        'blog_name': 'test2',
        'create_time': '2023-01-02',
        'num': 200
    }
    ]
    await db_client.insert('blog_num', data)

if __name__ == '__main__':
    asyncio.run(main())
    print('sadfasdf')
