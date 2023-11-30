FROM node:18-alpine

COPY package*.json ./
RUN yarn install

COPY . .

ARG MONGO_URI

RUN echo "MONGO_URI=${MONGO_URI}" >> .env

EXPOSE 8000
CMD yarn start