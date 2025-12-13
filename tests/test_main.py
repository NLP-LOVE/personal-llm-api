
from agents import Agent, Runner, set_default_openai_client, set_default_openai_api, set_tracing_disabled
from openai import AsyncOpenAI
from agents import Agent, function_tool

# 1. 创建自定义客户端，指定你的模型服务终点和API Key
custom_client = AsyncOpenAI(
    base_url="http://127.0.0.1:2321",
    api_key="sk-6krzNJoef72vmQkzCAf97BFiMwevu2cQ"  # 替换为你的API密钥
)

# 2. 进行全局配置
set_default_openai_client(custom_client)
set_default_openai_api("chat_completions")  # 指定API类型
set_tracing_disabled(True)  # 如果使用第三方API，建议关闭追踪

@function_tool
def add(a: str, b: str) -> str:
    """计算两个数的和
    Args:
        a: 第一个数字
        b: 第二个数字
    """
    print(a, b)
    return str(int(a) + int(b))


math_add_agent = Agent(
    name="math_add_agent",
    model="deepseek-v3.2",
    instructions="你是一个数学问题解答专家，你只能回答数学问题，不能回答其他问题。",
    tools=[add],
)

result = Runner.run_sync(math_add_agent, "1564 加上 845等于多少")
print(result.final_output)








