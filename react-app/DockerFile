FROM node:21-alpine as base

WORKDIR /app

#COPY package.json /tmp/package.json
#RUN cd /tmp && npm install
#RUN cp -a /tmp/node_modules /app/

COPY . .

FROM base as production

ENV NODE_PATH ./build
