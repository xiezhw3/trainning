FROM debian:7.8

# basic
ADD ./misc/sources.list /etc/apt/sources.list
RUN apt-get update

# deps
ADD ./misc/requirements.txt /
RUN apt-get -y install python-pip
RUN pip install -r requirements.txt

ADD ./code /code
ADD ./conf/config.py /code/
ADD ./scripts/run.sh  /run.sh

WORKDIR /
CMD ["bash", "run.sh"]
