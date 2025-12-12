import yaml
import os
import sys


def get_system_proxies():
    if sys.platform == 'win32':
        # Windows系统代理获取逻辑
        import winreg
        try:
            with winreg.OpenKey(winreg.HKEY_CURRENT_USER, r'Software\Microsoft\Windows\CurrentVersion\Internet Settings') as key:
                proxy_enable = winreg.QueryValueEx(key, 'ProxyEnable')[0]
                if proxy_enable:
                    proxy_server = winreg.QueryValueEx(key, 'ProxyServer')[0]
                    return {'http://': f'http://{proxy_server}',
                            'https://': f'https://{proxy_server}'}
        except:
            pass
    else:
        # Unix-like系统通常使用环境变量
        http_proxy = os.environ.get('http_proxy') or os.environ.get('HTTP_PROXY')
        https_proxy = os.environ.get('https_proxy') or os.environ.get('HTTPS_PROXY')

        proxies = {}
        if http_proxy:
            proxies['http://'] = http_proxy
        if https_proxy:
            proxies['https://'] = https_proxy
        return proxies

    return None


class Settings():

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        # 读取yaml配置文件
        with open('app_config.yaml', 'r', encoding='utf-8') as file:
            yaml_config = yaml.safe_load(file)

        self.MYSQL_HOST = yaml_config['database']['mysql']['host']
        self.MYSQL_PORT = yaml_config['database']['mysql']['port']
        self.MYSQL_USER = yaml_config['database']['mysql']['user']
        self.MYSQL_PASSWORD = yaml_config['database']['mysql']['password']
        self.MYSQL_DATABASE = yaml_config['database']['mysql']['database']
        self.PROJECT_PATH = os.path.dirname(__file__)
        self.PROXIES = get_system_proxies()

        print()


# 创建全局配置实例
settings = Settings()
