FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY . .

RUN npm install
RUN npx prisma generate

ENV DATABASE_URL=mysql://lasthope:lasthopelesmeilleurs@marvincrepin.com:3306/lasthope?serverVersion=5.7
CMD ["npm", "start"]