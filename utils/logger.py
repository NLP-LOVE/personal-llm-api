
import time

from loguru import logger

from utils.util import get_current_timestamp

class Logger(object):

    def __init__(self, service_name, id):
        self.id = id if id else ''
        self.service_name = service_name

    def get_message(self, message):
        current_time = get_current_timestamp()

        message = f"{current_time} 【{self.service_name}】 {self.id} {message}"
        return message

    def info(self, message):
        message = self.get_message(message)
        logger.info(message)

    def error(self, message):
        message = self.get_message(message)
        logger.error(message)

    def debug(self, message):
        message = self.get_message(message)
        logger.debug(message)

    def warning(self, message):
        message = self.get_message(message)
        logger.warning(message)

if __name__ == '__main__':
    log = Logger('', '')
    t5 = time.time()
    log.info("test")
    t6 = time.time()
    dual_time = t6 - t5
    print()
