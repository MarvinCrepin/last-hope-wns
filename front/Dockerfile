FROM node:21.2-alpine3.18

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install 

CMD ["npm", "start"]