#!/bin/sh

cd $( dirname $0 )/../
echo $WORKDIR

export WORKDIR=$PWD
export PROJECT="$(basename $PWD)"
export COMPOSE_ENV="dev"

get_tag() {
    BRANCH=$( git branch --no-color 2>/dev/null | awk '/\*/{print $2}' )
    BRANCH=${TAG:-'latest'}
    echo ${BRANCH/\//_}
}

export TAG=$(get_tag)

build() {
    IMAGE="dockerhub.nie.netease.com/gzxiezhiwang/$PROJECT:$TAG"
    docker build -t "$IMAGE" .
}

compose() {
    docker-compose -p $PROJECT \
        -f misc/compose/docker-compose.yml \
        -f misc/compose/docker-compose.$COMPOSE_ENV.yml \
        "$@"
}

start() {
    compose stop
    compose rm -f
    compose up -d
}

stop() {
    compose stop
}

case "$1" in
  build)
      build
      ;;
  start)
        start
        ;;
  stop)
        stop
        ;;
  *)
        echo $"Usage: $0 {build|start|stop}"
        exit 1
esac
exit 0
