## 单机监控系统
这个系统是一个对主机 cpu 和 内存进行监控的单机监控系统，目前包括两种运行方式，直接在物理机运行和使用 docker 容器运行。目前已经完成 docker compose 文件，可以直接通过 docker compose 来运行容器。

### 文件目录

    .
    ├── code
    │   ├── api
    │   │   ├── agent_api.py
    │   │   └── __init__.py
    │   ├── __init__.py
    │   ├── __main__.py
    │   ├── modules
    │   │   ├── db_processor
    │   │   │   ├── db_processor.py
    │   │   │   └── __init__.py
    │   │   ├── __init__.py
    │   │   └── single_agent
    │   │       ├── agent.py
    │   │       ├── __init__.py
    │   │       └── monitor.py
    │   └── utils
    │       ├── __init__.py
    │       └── status.py
    ├── conf
    │   ├── config.py
    │   └── __init__.py
    ├── Dockerfile
    ├── docs
    │   ├── README.md
    │   └── 第0阶段_预备知识总结.md
    ├── misc
    │   ├── docker-compose.dev.yml
    │   ├── docker-compose.yml
    │   ├── pip.conf
    │   ├── requirements.txt
    │   └── sources.list
    ├── README.md
    ├── scripts
    │   └── run.sh
    └── tests
        ├── run.py
        └── test.sh

## 运行
### 物理机运行
项目分为两个部分，一个是 server，负责进行监控并将监控数据存储到数据库，另一个是 api，目前提供了三个接口，获取全部数据，根据 id 获取某个数据，根据时间段过滤数据。两个服务单独运行。

#### 运行依赖

    mongodb == 3.2
    pymongo == 3.2
    psuntil == 3.3.0
    flask == 0.1.x
    docopt == 0.6.2

#### 运行方式

* server
```
# 可以通过运行 python -m code -h 获取运行提示
$ python -m code server [-t ttl] [-m MODULE]
```

* api
```
$ python -m code api
```

#### api 使用
在运行 api 后，可以通过一下方式进行对应数据的查询：

```
# 查询全部数据
$ curl ip:5000/

# 根据 id 获取数据
$ curl ip:5000/<_id>

# 根据时间段获取数据，时间为一个浮点数
$ curl ip:5000/from_time/to_time
```

### docker 容器运行
目前我在将我的镜像推到 dockerhub 时出现了问题，自建的 mongo 推不上去。后面我会及时尝试 push 上去。或者尝试换仓库。推上去后即可通过运行 docker-compose 文件来运行容器。

#### 环境准备
因为 Docker 的安装资源文件放在 Amazon S3，国内下载间歇性连接失败，因此后面的 docker 安装，镜像下载等都会基于 Daocloud 的镜像仓库

下面默认 linux 下安装，osx 和 windows 需要安装 toolbox

* 安装 docker
```
$ curl -sSL https://get.daocloud.io/docker | sh
``` 
* 安装 docker-compose
```
$ curl -L https://get.daocloud.io/docker/compose/releases/download/1.5.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
$ chmod +x /usr/local/bin/docker-compose
# 你可以通过修改URL中的版本，可以自定义您的需要的版本。
```

#### 运行方式
在 training 目录下运行如下命令：
```
$ docker-compose -p code -f misc/docker-compose.yml up
```
来启动容器。因为 mongo 启动完成会比 server 模块慢，所以第一次启动可能会因为 mongo 还没完全启动使得 server 运行失败，已经在 docker-compose 里面加入自动重启机制，所以只需要等待一段时间整个系统就会正常运行。

### Contact

e-mail: xiezhw3@163.com
