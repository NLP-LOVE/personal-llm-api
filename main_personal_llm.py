import platform
import os
import asyncio

from loguru import logger
current_file_path = os.path.abspath(__file__)
log_file = os.path.join(os.path.dirname(current_file_path), 'logs', 'personal_llm_{time:YYYY-MM-DD}.log')
logger.add(
    log_file,  # 按日期命名的日志文件
    rotation="00:00",              # 每天午夜轮转
    retention="10 days",           # 保留10天的日志
    format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {module}:{function}:{line} - {message}",
    level="INFO"
)


# 导入FastAPI
from fastapi import FastAPI, Request
from init import init_db




# 初始化数据库
asyncio.run(init_db())


# 创建FastAPI应用实例
app = FastAPI(
    docs_url=None,      # 禁用 Swagger UI
    redoc_url=None,     # 禁用 ReDoc
    openapi_url=None    # 禁用 OpenAPI JSON
)

# 定义LLM接口
@app.post('/v1/chat/completions')
@app.post('/chat/completions')
async def chat_completions(request: Request):
    # 接收请求体
    req = await request.json()


    return {"Hello": "World"}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
