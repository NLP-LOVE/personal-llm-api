import yaml
import os
import sys
import requests


def install_statistics(project_path):
    try:
        with open(os.path.join(project_path, 'db', 'version')) as f:
            version = f.read().strip()
        res= requests.post('http://statistics.dx3906.info/install-statistics', json={'version': version}, timeout=5)
    except:
        pass


def get_system_proxies():
    if sys.platform == 'win32':
        # Windows系统代理获取逻辑
        import winreg
        try:
            with winreg.OpenKey(winreg.HKEY_CURRENT_USER, r'Software\Microsoft\Windows\CurrentVersion\Internet Settings') as key:
                proxy_enable = winreg.QueryValueEx(key, 'ProxyEnable')[0]
                if proxy_enable:
                    proxy_server = winreg.QueryValueEx(key, 'ProxyServer')[0]
                    return f'http://{proxy_server}'
        except:
            pass
    else:
        # Unix-like系统通常使用环境变量
        http_proxy = os.environ.get('http_proxy') or os.environ.get('HTTP_PROXY')
        if http_proxy:
            return http_proxy

    return None


class Settings():

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        # 读取yaml配置文件
        with open('app_config.yaml', 'r', encoding='utf-8') as file:
            yaml_config = yaml.safe_load(file)

        if yaml_config['database']['use_db'] == 'mysql':
            self.MYSQL_HOST = yaml_config['database']['mysql']['host']
            self.MYSQL_PORT = yaml_config['database']['mysql']['port']
            self.MYSQL_USER = yaml_config['database']['mysql']['user']
            self.MYSQL_PASSWORD = yaml_config['database']['mysql']['password']
            self.MYSQL_DATABASE = yaml_config['database']['mysql']['database']
        else:
            self.SQLITE_PATH = yaml_config['database']['sqlite']['db_path']

        self.USE_DB = yaml_config['database']['use_db']
        self.PROJECT_PATH = os.path.dirname(__file__)

        # 代理设置
        if yaml_config['proxy']['type'] == 'system':
            self.PROXIES = get_system_proxies()
        elif yaml_config['proxy']['type'] == 'manual':
            self.PROXIES = yaml_config['proxy']['url']
        else:
            self.PROXIES = None

        print()


# 创建全局配置实例
settings = Settings()
