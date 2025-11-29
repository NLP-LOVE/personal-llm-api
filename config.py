import yaml


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
        print()


# 创建全局配置实例
settings = Settings()
