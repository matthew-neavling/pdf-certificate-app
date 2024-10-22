FROM node:20-alpine

RUN apk update && apk add libstdc++

WORKDIR /app

COPY package*.json ./

ENV NODE_OPTIONS='--trace-warnings'

RUN npm install

COPY . .

EXPOSE 80

ENTRYPOINT [ "npm", "run", "start" ]