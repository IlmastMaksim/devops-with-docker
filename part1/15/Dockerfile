FROM node:14

EXPOSE 5000

WORKDIR /usr/src/app

COPY . .

RUN yarn

RUN yarn run build

RUN yarn global add serve

CMD ["serve", "-s", "build"]