from flask import Flask
import socket
import os

import config

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello World! application run successfully from %s' % (socket.gethostname(), )

if __name__ == "__main__":
    app.run(host=config.APP_HOST, port=config.APP_PORT, debug=config.DEBUG)
