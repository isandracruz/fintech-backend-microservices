FROM node:24-alpine AS builder

ARG APP_NAME
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build ${APP_NAME}


FROM node:24-alpine

ARG APP_NAME
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY --from=builder /usr/src/app/dist/apps/${APP_NAME} ./dist


EXPOSE 3000

CMD ["node", "dist/main.js"]