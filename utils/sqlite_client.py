import os
import sys
import asyncio
from datetime import datetime

import pandas as pd
import aiosqlite
from config import settings

# 添加上层目录
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

class SqliteClient(object):
    def __init__(self, db_path):
        self.db_path = db_path

    async def select(self, sql):
        data = []
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute('PRAGMA synchronous = OFF;')

            cur = await db.execute(sql)
            columns = [column[0] for column in cur.description]
            result = await cur.fetchall()

            data = []
            for row in result:
                _dict = {}
                for col, val in zip(columns, row):
                    if col == 'create_time' or col == 'update_time':
                        val = datetime.strptime(val, '%Y-%m-%d %H:%M:%S')
                    _dict[col] = val
                data.append(_dict)

        return data

    async def execute(self, sql):
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute(sql)
            await db.commit()

    async def update(self, table_name, data:dict, where):
        async with aiosqlite.connect(self.db_path) as db:
            if where:
                update_query = f'UPDATE {table_name} SET {", ".join([f"{key} = ?" for key in data.keys()])} WHERE {where}'
            else:
                update_query = f'UPDATE {table_name} SET {", ".join([f"{key} = ?" for key in data.keys()])}'
            await db.execute(update_query, list(data.values()))
            await db.commit()

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

        async with aiosqlite.connect(self.db_path) as db:
            columns = ', '.join(data[0].keys())
            placeholders = ', '.join(['?'] * len(data[0]))
            insert_query = f'INSERT INTO {table_name} ({columns}) VALUES ({placeholders})'
            await db.executemany(insert_query, [tuple(item.values()) for item in data])
            await db.commit()

db_client = SqliteClient(settings.SQLITE_PATH)

async def main():
    # sql = 'select * from llm_user'
    # result = await db_client.select(sql)

    data = [{
        'id': 3,
        'username': 'test',
        'password': 'sdf',
        'is_first_login': 1,
        'create_time': '2023-01-01 00:00:00',
    },
        {
            'id': 2,
            'username': 'test2',
            'password': 'sdf2',
            'is_first_login': 1,
            'create_time': '2023-01-02 00:00:00',
        }
    ]
    await db_client.insert('llm_user', data)

if __name__ == '__main__':
    asyncio.run(main())
    print('sadfasdf')
