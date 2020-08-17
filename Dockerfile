#Carefull with the node version, in node:12^ have a dependency problem
FROM node:10.21-buster-slim

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i
#Into the package.json you can add Bcrypt as DevDependency
# RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 9000

CMD [ "node", "index.js" ]


