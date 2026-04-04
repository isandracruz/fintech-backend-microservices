FROM node:24-alpine

ARG APP_NAME
ENV APP_MAIN_FILE=dist/apps/${APP_NAME}/main.js

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build ${APP_NAME}

CMD ["sh", "-c", "exec node ${APP_MAIN_FILE}"]