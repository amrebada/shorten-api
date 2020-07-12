FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 5000
CMD [ "npm", "run", "start" ]