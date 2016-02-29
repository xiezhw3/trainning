#!/bin/bash

MODULE=$2

start() {
        echo -n "Starting ${MODULE}"
        echo
        docker-compose -p agent -f misc/compose/docker-compose.yml up -d ${MODULE}
        echo "${MODULE} startup"
        echo
}

stop() {
        echo -n "Stopping ${MODULE} server"
        echo
        docker-compose -p agent -f misc/compose/docker-compose.yml stop ${MODULE}
        echo
}

reload() {
        echo -n "Stopping ${MODULE} server"
        echo
        docker-compose -p agent -f misc/compose/docker-compose.yml stop ${MODULE}
        docker-compose -p agent -f misc/compose/docker-compose.yml rm -f ${MODULE}
        docker build -t dockerhub.nie.netease.com/gzxiezhiwang/agent-server:1.0 ./
        docker-compose -p agent -f misc/compose/docker-compose.yml up -d ${MODULE}
        echo
}

status() {
    docker logs "agent_${MODULE}_1"
}

### main logic ###
case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  reload)
        reload
        ;;
  status)
        status
        ;;
  restart)
        stop
        start
        ;;
  *)
        echo $"Usage: $0 {start|stop|restart|reload|status MODULE}"
        exit 1
esac
exit 0
