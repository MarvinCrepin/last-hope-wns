FROM node:23.11.1-alpine3.21

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install 

CMD ["npm", "start"]