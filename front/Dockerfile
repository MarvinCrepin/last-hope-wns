FROM node:21.6.0-alpine3.19

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install 

CMD ["npm", "start"]