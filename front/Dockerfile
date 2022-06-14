FROM node:16

WORKDIR /front

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./

CMD ["npm", "start"]