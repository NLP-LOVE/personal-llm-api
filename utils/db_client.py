

from config import settings


if settings.USE_DB == 'mysql':
    from utils.mysql_client import db_client
else:
    from utils.sqlite_client import db_client


