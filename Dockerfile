FROM node:8.16.0-jessie

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN npm install

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "serve"]

