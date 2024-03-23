FROM node:21-alpine3.18

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm install

EXPOSE 8090

CMD [ "npm", "run", "docker" ]