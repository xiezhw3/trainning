#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import sys
import time
from flask import Flask
from flask import Blueprint

from code import __main__ as main

from conftest import build_url, DATA


class TestMain:
    def test_create_app(self):
        app = main.create_app()
        assert isinstance(app, type(Flask(__name__)))
        assert app.debug

        conf = {
            'HOST': 'localhost',
            'PORT': 5100,
            'DEBUG': True,
        }
        app = main.create_app(conf)
        assert app.config['HOST'] == conf['HOST']

    def test_run_wsgi(self, monkeypatch, app):
        class WSGIServer:
            def __init__(self, listen_to, application, log, **kwargs):
                pass

            def serve_forever(self):
                pass
        monkeypatch.setattr(main, 'WSGIServer', WSGIServer)
        main.run_wsgi(app)

    def test_register_site(self, monkeypatch, app):
        main.register_site(app, Blueprint('__main__' + 'api',
                                          '__main__'))
        # TODO 这部分暂时没有找到好的测试方法
        with app.test_client() as client:
            url = build_url(from_time=time.time() - 1000,
                            to_time=time.time(),
                            ip=DATA['records_valid'][0]['ip'])
            client.get(url)

    def test_shutdown_session(self, monkeypatch, app):
        class G:
            class Session:
                def close(self):
                    pass

            def __init__(self):
                self._session = self.Session()

        monkeypatch.setattr(main, 'g', G())
        main.register_site(app, Blueprint('__main__' + 'api',
                                          '__main__'))

    def test_api(self, app, monkeypatch):
        app = main.api(True)
        assert isinstance(app, type(Flask(__name__)))

        def run_wsgi(api):
            print 'run api'

        monkeypatch.setattr(main, 'run_wsgi', run_wsgi)
        api = main.api()
        assert api is None

    def test_server(self, monkeypatch):
        from code.modules.single_agent import monitor

        class Monitor:
            def __init__(self, ttl, percpu, modules):
                pass

            def start(self):
                print 'start server'

        monkeypatch.setattr(monitor, 'Monitor', Monitor)
        main.server()

    def test_consumer(self, monkeypatch):
        from code.modules.queue import consumer

        class Consumer:
            def start(self):
                print 'start consumer'

            def stop(self):
                print 'stop consumer'

        class ConsumerKeyboardInterrupt:
            def start(self):
                raise KeyboardInterrupt

            def stop(self):
                print 'stop consumer'

        class ConsumerRuntimeError:
            def start(self):
                raise RuntimeError

            def stop(self):
                print 'stop consumer'
        monkeypatch.setattr(consumer, 'Consumer', Consumer)
        main.consumer()

        monkeypatch.setattr(consumer, 'Consumer', ConsumerKeyboardInterrupt)
        main.consumer()

        def exit(code):
            print code

        monkeypatch.setattr(consumer, 'Consumer', ConsumerRuntimeError)
        monkeypatch.setattr(sys, 'exit', exit)
        main.consumer()

    def test_run(self, monkeypatch):
        '''测试 __main__ 被当成模块运行时'''
        def server(ttl, module):
            assert sys.argv[1] == 'server'

        def api():
            assert sys.argv[1] == 'api'

        def consumer():
            assert sys.argv[1] == 'consumer'

        def docopt(doc, version):
            return {
                'TTL': 60,
                'MODULE': 'all'
            }

        monkeypatch.setattr(main, 'server', server)
        monkeypatch.setattr(main, 'docopt', docopt)
        monkeypatch.setattr(main, 'api', api)
        monkeypatch.setattr(main, 'consumer', consumer)

        # server
        sys.argv = ['python', 'server']
        main.run()

        # api
        sys.argv = ['python', 'api']
        main.run()

        # consumer
        sys.argv = ['python', 'consumer']
        main.run()
