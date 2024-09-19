FROM node:alpine

WORKDIR /service

COPY package.json ./

RUN yarn add -g ts-node nodemon
RUN yarn install
RUN yarn add typescript
RUN yarn add serve

COPY src ./src
COPY public ./public
RUN yarn build

CMD ["yarn", "serve", "-s", "build"]
