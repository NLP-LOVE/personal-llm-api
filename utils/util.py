import datetime
import time
import threading
import hashlib
from functools import wraps

import pytz
from pydantic import BaseModel, validator
from fastapi import Request
from fastapi.exceptions import HTTPException



# 设置时区
shanghai_tz = pytz.timezone('Asia/Shanghai')

def get_current_timestamp():
    """
    返回当前时间戳，精确到3位毫秒
    :return:
    """
    now = datetime.datetime.now(shanghai_tz)
    timestamp = now.strftime('%Y-%m-%d %H:%M:%S.%f')
    return timestamp[:-3]

def get_before_timestamp(days):
    # 获取当前日期
    now = datetime.datetime.now()
    # 获取今天的0点时间
    today_start = datetime.datetime(now.year, now.month, now.day)
    # 计算指定天数前的0点时间
    before_time = int((today_start - datetime.timedelta(days=int(days))).timestamp())
    return before_time

def get_before_day(days):
    # 获取当前日期
    now = datetime.datetime.now()
    # 获取今天的0点时间
    today_start = datetime.datetime(now.year, now.month, now.day)
    # 计算指定天数前的0点时间
    before_time = today_start - datetime.timedelta(days=int(days))
    return before_time.strftime('%Y-%m-%d')

def get_before_month(months):
    # 获取当前日期
    now = datetime.datetime.now()
    year = now.year
    month = now.month
    for i in range(months, 0, -1):
        month -= 1
        if month <= 0:
            month = 12
            year -= 1
    # 获取指定月份的第一天
    first_day = datetime.datetime(year, month, 1)
    # 计算指定月份的0点时间
    return first_day.strftime('%Y-%m-%d')

def md5_encrypt(string: str) -> str:
    """
    对字符串进行MD5加密
    :param string: 要加密的字符串
    :return: MD5加密后的字符串(32位小写)
    """
    md5_hash = hashlib.md5()
    md5_hash.update(string.encode('utf-8'))
    return md5_hash.hexdigest()

class SnowflakeGenerator:
    def __init__(self, worker_id=0, datacenter_id=0):
        self.worker_id = worker_id
        self.datacenter_id = datacenter_id
        self.sequence = 0
        self.last_timestamp = -1
        self.lock = threading.Lock()

        # 2020-01-01 00:00:00 作为起始时间戳
        self.twepoch = 1577836800000  

    def _current_time(self):
        return int(time.time() * 1000)

    def _wait_next_millis(self, last_timestamp):
        timestamp = self._current_time()
        while timestamp <= last_timestamp:
            timestamp = self._current_time()
        return timestamp

    def next_id(self):
        with self.lock:
            timestamp = self._current_time()

            if timestamp < self.last_timestamp:
                raise Exception("时钟回拨异常")

            if timestamp == self.last_timestamp:
                self.sequence = (self.sequence + 1) & 0xFFF
                if self.sequence == 0:
                    timestamp = self._wait_next_millis(self.last_timestamp)
            else:
                self.sequence = 0

            self.last_timestamp = timestamp

            return ((timestamp - self.twepoch) << 22) | \
                   (self.datacenter_id << 17) | \
                   (self.worker_id << 12) | \
                   self.sequence

# 全局雪花ID生成器实例
snowflake = SnowflakeGenerator()



# 获取request参数
async def get_request_params(request: Request) -> dict:
    if request.method == 'POST':
        params = await request.json()
    else:
        params = request.query_params._dict
    
    return params

# 验证是否登录
def require_auth(func):
    """自定义装饰器"""

    @wraps(func)
    async def wrapper(*args, **kwargs):
        # 获取请求对象
        request = kwargs.get('request')
        session = request.session
        # 检查是否登录
        if 'user_id' not in session:
            # 未登录，返回登录页面
            raise HTTPException(status_code=401, detail="Not authenticated")

        return await func(*args, **kwargs)

    return wrapper

# 验证分页参数
class PaginationParams(BaseModel):
    page: int = 1
    perPage: int = 10

    @validator('page')
    def validate_page(cls, v):
        """分页参数验证"""
        if v <= 0:
            raise ValueError('分页参数page必须大于0')
        return v

    @validator('perPage')
    def validate_perPage(cls, v):
        """分页参数验证"""
        if v <= 0:
            raise ValueError('分页参数page_size必须大于0')
        return v

def get_page_params(page: int, perPage: int):
    return PaginationParams(page=page, perPage=perPage)