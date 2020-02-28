# https://github.com/BretFisher/node-docker-good-defaults/blob/master/Dockerfile
FROM node:alpine

RUN npm i npm@latest -g

RUN mkdir /opt/node_app && chown node:node /opt/node_app
WORKDIR /opt/node_app

USER node
COPY package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /opt/node_app/node_modules/.bin:$PATH

WORKDIR /opt/node_app/app
COPY . .

ENV NODE_ENV docker

CMD [ "node", "chat.js" ]
