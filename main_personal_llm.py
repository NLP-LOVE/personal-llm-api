import os
import asyncio
import shutil

from loguru import logger
current_file_path = os.path.abspath(__file__)
log_file = os.path.join(os.path.dirname(current_file_path), 'logs', 'personal_demo_{time:YYYY-MM-DD}.log')
logger.add(
    log_file,  # 按日期命名的日志文件
    rotation="00:00",              # 每天午夜轮转
    retention="3 days",           # 保留10天的日志
    format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {module}:{function}:{line} - {message}",
    level="INFO"
)


# 导入FastAPI
import uvicorn
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic_core import ValidationError
from apscheduler.schedulers.background import BackgroundScheduler

from init import init_db
from config import settings
from backend.backend_api import backend_router
from backend.llm_usage import router as llm_usage_router
from backend.api_manage import router as api_router
from backend.chat import router as chat_router


async def init_app():
    # 初始化数据库
    await init_db()

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


def my_scheduled_job():
    # 源文件路径
    src_file = os.path.join(settings.PROJECT_PATH, 'db', 'llm_backup.db')
    # 目标文件路径（包括新文件名）
    dst_file = os.path.join(settings.PROJECT_PATH, 'db', 'llm.db')
    # 复制并重命名文件，如果目标文件已存在则覆盖
    shutil.copy2(src_file, dst_file)

@app.on_event("startup")
async def startup_event():
    my_scheduled_job()
    scheduler = BackgroundScheduler()
    # 添加定时任务，每天凌晨 4 点执行
    scheduler.add_job(my_scheduled_job, "cron", hour=4, minute=0)
    scheduler.start()

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

@app.exception_handler(ValidationError)
async def validation_exception_handler2(request, exc):
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
    uvicorn.run(app, host="0.0.0.0", port=2323)
