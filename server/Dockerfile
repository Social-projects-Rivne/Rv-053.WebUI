FROM node:lts
WORKDIR /app
COPY package*.json /app/
RUN npm install
#or without dependencies
#RUN npm install nodemon
ENV PATH /app/node_modules/.bin$PATH
COPY . /app/
EXPOSE 5001
CMD [ "npm", "start"]
#or without dependencies
# CMD [ "nodemon","app.js"]
