FROM node:18-alpine

FROM mcr.microsoft.com/playwright:focal

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev
RUN npm install
RUN npx prisma generate
RUN npm run build

CMD [ "node", "dist/main.js" ]
