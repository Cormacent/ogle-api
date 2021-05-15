FROM node:14

RUN npm install -g nodemon

WORKDIR /src
CMD ["npm", "start"]

EXPOSE 8081
