FROM node:16.15.1-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY prisma prisma
COPY src src
COPY tsconfig.json ./

RUN npm install
RUN npx prisma generate

ENV DATABASE_URL=mysql://lasthope:lasthopelesmeilleurs@marvincrepin.com:3306/lasthope?serverVersion=5.7
CMD ["npm", "start"]