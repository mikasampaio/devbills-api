FROM node:18.19.0-alpine

WORKDIR /home/app

COPY . ./

RUN npm i 

EXPOSE 3334

CMD ["npm", "run", "dev"]