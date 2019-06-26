FROM node:8.16.0-jessie

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN npm ci

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]

