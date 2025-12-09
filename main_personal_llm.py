import os
import asyncio
import json

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
import uvicorn
from fastapi import FastAPI, Request, APIRouter
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse, FileResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from fastapi.exceptions import RequestValidationError, HTTPException
from fastapi.responses import JSONResponse


from init import init_db, init_models, get_model
from config import settings
from utils.mysql_client import db_client
from backend.backend_api import backend_router
from backend.llm_usage import router as llm_usage_router
from backend.api_manage import router as api_router
from backend.chat import router as chat_router


async def init_app():
    # 初始化数据库
    await init_db()
    # 初始化模型
    await init_models()

# 初始化
asyncio.run(init_app())



# 创建FastAPI应用实例
app = FastAPI(
    docs_url=None,      # 禁用 Swagger UI
    redoc_url=None,     # 禁用 ReDoc
    openapi_url=None    # 禁用 OpenAPI JSON
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境不要用 *
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    SessionMiddleware,
    secret_key='personal-llm-123',
    # 可选参数
    session_cookie="session",
    max_age=60*60*24,  # 1小时
    same_site="lax",
    https_only=False  # 开发环境设为False，生产环境建议设为True
)

# 挂载静态文件目录
app.mount("/static", StaticFiles(directory="static/"), name="static1")

# 挂载后端路由
app.include_router(backend_router)
app.include_router(llm_usage_router)
app.include_router(api_router)
app.include_router(chat_router)



@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    """自定义验证错误处理器"""
    errors = []
    for error in exc.errors():
        errors.append({
            "field": ".".join(str(loc) for loc in error['loc']),
            "message": str(error['ctx']['error']) if 'ctx' in error else '',
            "type": error['type']
        })

    return JSONResponse(
        status_code=200,
        content={"status": 1, "msg": errors[0]['message']}
    )

# @app.exception_handler(HTTPException)
# async def http_exception_handler(request, exc):
#     """HTTP异常处理器"""
#     return JSONResponse(
#         status_code=200,
#         content={"status": 1, "msg": exc.detail}
#     )


async def chat_stream(model, params):

    if 'tools' in params and params['tools'] and params['tools'][0]['type'] == 'web_search':
        async for chunk in model.chat_stream_response(params):
            ## sse返回数据
            yield f"data: {json.dumps(chunk, ensure_ascii=False)}\n\n"
    else:
        async for chunk in model.chat_stream(params):
            ## sse返回数据
            yield f"data: {json.dumps(chunk, ensure_ascii=False)}\n\n"

    # 完成
    yield "data: [DONE]\n\n"


# 校验api key是否存在
async def check_api_key(api_key: str):
    """校验api key是否存在"""
    api_key = api_key.replace('Bearer ', '')
    if not api_key or not api_key.startswith('sk-'):
        raise HTTPException(status_code=401, detail='api key error!')

    sql = f"SELECT 1 FROM llm_api_keys WHERE api_key = '{api_key}' and is_use = 1 and is_delete = 0"
    result = await db_client.select(sql)
    if not result:
        raise HTTPException(status_code=401, detail='api key error!')

# 参数校验
def validate_chat_params(params: dict):
    """校验chat参数"""
    if 'model' not in params:
        raise HTTPException(status_code=400, detail='model params error!')
    model = get_model(params['model'])
    if not model:
        raise HTTPException(status_code=500, detail='model params error!')

    if 'messages' not in params:
        raise HTTPException(status_code=400, detail='messages params error!')
    if not params['messages']:
        raise HTTPException(status_code=400, detail='messages params error!')
    if 'stream' in params and params['stream'] == True and 'stream_options' not in params:
        params['stream_options'] = {'include_usage': True}

    # 处理web_search参数
    if 'web_search' in params:
        params['tools'] = [{"type": "web_search"}]
        del params['web_search']

    # 补充extra body参数
    if params['model'] == 'qwen3-235b-a22b' and ('stream' not in params or params['stream'] == False):
        params['extra_body'] = {}
        params['extra_body']['enable_thinking'] = False
    elif 'enable_thinking' in params:
        params['extra_body'] = {}
        params['extra_body']['enable_thinking'] = params['enable_thinking']
        del params['enable_thinking']
    if 'thinking_budget' in params:
        params['extra_body']['thinking_budget'] = params['thinking_budget']
        del params['thinking_budget']

    return params


# 3. 定义路由和视图函数
@app.post('/v1/chat/completions')
@app.post('/chat/completions')
async def chat_completions(request: Request):
    # 校验key
    api_key = request.headers.get('Authorization')
    await check_api_key(api_key)

    # 接收请求体
    req = await request.json()
    # 校验参数
    req = validate_chat_params(req)

    # 1. 获取模型
    model = get_model(req['model'])
    del req['model']

    # 2. 判断是否是流式
    if req.get('stream', False):
        # 流式
        return StreamingResponse(chat_stream(model, req), media_type="text/event-stream")
    else:
        # 非流式
        answer = await model.chat(req)
        return answer


# 定义dashboard入口
@app.get('/dashboard/{path:path}')
async def dashboard(request: Request, path: str):

    # 获取session
    session = request.session

    if path == 'login':
        return FileResponse(os.path.join(settings.PROJECT_PATH, 'dashboard', 'login.html'))

    # 检查是否登录
    if 'user_id' not in session:
        # 未登录，返回登录页面
        return RedirectResponse(url="/dashboard/login")

    if path == 'reset-password':
        return FileResponse(os.path.join(settings.PROJECT_PATH, 'dashboard', 'reset_password.html'))
    elif path == 'home' or path == '':
        return FileResponse(os.path.join(settings.PROJECT_PATH, 'dashboard', f'index.html'))
    else:
        return FileResponse(os.path.join(settings.PROJECT_PATH, 'dashboard', f'{path}'))



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=2321)
