from flask import Flask
from redis import Redis
import os

import config

app = Flask(__name__)
redis = Redis(host=config.REDIS_ADDR, port=config.REDIS_PORT)

@app.route('/')
def hello():
    redis.incr('hits')
    return 'Hello World! I have been seen %s times.' % redis.get('hits')

if __name__ == "__main__":
    app.run(host=config.APP_HOST, port=config.APP_PORT, debug=config.DEBUG)
