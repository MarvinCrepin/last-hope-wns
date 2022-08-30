FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY . .

RUN npm install
RUN npx prisma generate

CMD ["npm", "start"]