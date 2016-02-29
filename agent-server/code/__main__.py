#! /usr/bin/env python
# -*- coding: utf-8 -*-

# Author: xiezhw3@163.com
# @contact: xiezhw3@163.com
# @version: $Id$
# Last modified: 2015-12-05
# FileName: agent.py
# Description: 监控 agent 启动模块

"""Example of program with many options using docopt.
Usage:
  code server [-t TTL] [-m MODULE]
  code api
  code consumer

Options:
    -h, --help            show this help message and exit
    -v, --version            show version and exit
    -t, --ttl         print status messages
    --module      use MODULE

Modules:
    all, cpu, memory
"""

import sys
import traceback
import logging
from docopt import docopt

from flask import Flask, g
from gevent.pywsgi import WSGIServer

from conf import config


def create_app(conf=None):
    app = Flask(__name__)
    if conf and isinstance(conf, dict):
        app.config.update(conf)
    app.debug = True
    return app


def run_wsgi(app):
    log = 'default'
    ssl_args = {}
    listen_to = (
        app.config.get('FLASK_HOST', '0.0.0.0'),
        app.config.get('FLASK_PORT', 5100)
    )
    server = WSGIServer(
        listen_to,
        application=app,
        log=log,
        **ssl_args
    )
    server.serve_forever()


def register_site(app, blueprint):
    app.register_blueprint(blueprint, url_prefix='/api/v1')

    @app.teardown_appcontext
    def shutdown_session(exception=None):
        session = getattr(g, '_session', None)
        if session:
            session.close()


def init_api(conf, blueprint, unit_test=False):
    app = create_app(conf)
    register_site(app, blueprint)
    if unit_test:
        return app
    run_wsgi(app)


def api(unit_test=False):
    conf = {
        'HOST': config.FLASK_HOST,
        'PORT': config.FLASK_PORT,
        'DEBUG': config.DEBUG,
    }
    from code.api.agent_api import blueprint
    return init_api(conf, blueprint, unit_test)


def server(ttl=None, modules=None, percpu=False):
    '''启动监控器'''
    from code.modules.single_agent.monitor import Monitor
    # TODO 这里可以选择对一台机器将所有 cpu 当成一个和还是分别监控
    # 但是简单起见目前不开放这个功能，后续可以改进
    monitor = Monitor(ttl, percpu, modules)
    monitor.start()


def consumer():
    from code.modules.queue.consumer import Consumer
    consumer = Consumer()
    try:
        logging.info("Start consumer")
        consumer.start()
    except KeyboardInterrupt:
        logging.info('Stop consumer')
        consumer.stop()
    except Exception as error:
        logging.error("Run worker error: [%s], [%s], [%s]" %
                      (error.__class__.__name__,
                       error,
                       traceback.format_exc()))
        sys.exit(1)


if __name__ == '__main__':
    arguments = docopt(__doc__, version='1.0.0')
    if sys.argv[1] == 'server':
        if arguments['TTL']:
            arguments['TTL'] = int(arguments['TTL'])
        server(arguments['TTL'], arguments['MODULE'])
    elif sys.argv[1] == 'api':
        api()
    else:
        consumer()
