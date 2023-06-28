FROM node:20-slim

WORKDIR /home/node/app

RUN apt-get update

RUN apt-get -y install nano
RUN apt-get -y install vim
RUN apt-get install net-tools
RUN apt-get -y install openssl

USER node

CMD [ "tail", "-f", "/dev/null" ]