FROM node:latest
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install -g yarn
RUN yarn install
COPY . /usr/src/app
CMD yarn start:dev
