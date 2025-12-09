import secrets
import string


def generate_api_key(length=32):
    """
    生成一个指定长度的安全 API 密钥。

    :param length: 密钥的长度，默认为 32 个字符。
    :return: 生成的 API 密钥字符串。
    """
    # 定义密钥的字符集，包括字母和数字
    alphabet = string.ascii_letters + string.digits

    # 使用 secrets.choice 从字符集中随机选择字符
    api_key = ''.join(secrets.choice(alphabet) for _ in range(length))
    api_key = f"sk-{api_key}"

    return api_key


# 示例：生成一个 32 位的 API 密钥
if __name__ == "__main__":
    key = generate_api_key()
    print("Generated API Key:", key)
