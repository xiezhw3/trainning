#!/bin/sh

cd $( dirname $0 )/../

_cmd_exists() {
    which $1 &>/dev/null
}

_install_rsa() {
    env LDFLAGS="-L$(brew --prefix openssl)/lib" \
        CFLAGS="-I$(brew --prefix openssl)/include" \
        SWIG_FEATURES="-cpperraswarn -includeall -I$(brew --prefix openssl)/include" \
        pip install m2crypto
}

_install_deps() {

    if _cmd_exists brew
    then
        # Mac
        install='brew install'
    else
        # Linux
        install='apt-get install -y'
    fi

    if ! _cmd_exists pip
    then
        $install python-pip
    fi

    if ! _cmd_exists swig
    then
        $install swig
    fi

    pip install tox > /dev/null
    _install_rsa
}

# 安装Tox
_install_deps > /dev/null

tox -c misc/tox.ini "$@"
