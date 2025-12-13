import os

from fastapi import APIRouter, Request
from pydantic import BaseModel, Field, ValidationInfo, field_validator

from utils.mysql_client import db_client

backend_router = APIRouter(prefix="/backend", tags=["backend"])


# 基础用户模型
class UserBase(BaseModel):
    username: str = Field()
    password: str = Field(description="密码")

    @field_validator('username')
    def validate_username(cls, v):
        """用户名格式验证"""
        if not v:
            raise ValueError('用户名不能为空')
        return v

    @field_validator('password')
    def validate_password(cls, v):
        """密码格式验证"""
        if not v:
            raise ValueError('密码不能为空')

        if len(v) < 8:
            raise ValueError('密码长度至少8位')
        return v

@backend_router.post('/login')
async def backend_login(request: Request, user: UserBase):


    # 检查用户名和密码是否正确
    sql = f"SELECT * FROM llm_user WHERE username = '{user.username}' AND password = '{user.password}'"
    result = await db_client.select(sql)

    if not result:
        return {"status": 1, "msg": "用户名或密码错误"}

    # 登录成功，设置session
    session = request.session
    session['user_id'] = result[0]['id']
    session['username'] = user.username
    session['is_first_login'] = result[0]['is_first_login']

    if session['is_first_login'] == 1:
        return {"status": 0, "msg": "登录成功", "data": {'is_first_login':result[0]['is_first_login']}}
    else:
        return {"status": 0, "msg": "登录成功", "data": {}}



class PasswordBase(BaseModel):
    password: str = Field()
    password_again: str = Field(description="确认密码")

    @field_validator('password_again')
    def validate_password_again(cls, v, info: ValidationInfo):
        """确认密码格式验证"""
        if not v:
            raise ValueError('确认密码不能为空')

        if len(v) < 8:
            raise ValueError('确认密码长度至少8位')

        if v != info.data['password']:
            raise ValueError('两次输入密码不一致')
        return v

    @field_validator('password')
    def validate_password(cls, v):
        """密码格式验证"""
        if not v:
            raise ValueError('密码不能为空')

        if len(v) < 8:
            raise ValueError('密码长度至少8位')
        return v

@backend_router.post('/reset-password')
async def backend_reset_password(request: Request, password: PasswordBase):

    # 检查session是否存在
    session = request.session
    if 'user_id' not in session:
        return {"status": 1, "msg": "请先登录"}

    sql = f"UPDATE llm_user SET password = '{password.password}', is_first_login = 0 WHERE id = {session['user_id']}"
    await db_client.execute(sql)

    # 更新session中的密码
    session['is_first_login'] = 0

    return {"status": 0, "msg": "密码重置成功"}

@backend_router.get('/logout')
async def backend_logout(request: Request):

    # 清除session
    session = request.session
    session.clear()
    return {"status": 0, "msg": "退出登录成功"}


