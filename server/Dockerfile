FROM node:lts
WORKDIR /app
COPY package*.json /app/
RUN npm install
#or without dependencies
#RUN npm install nodemon
COPY . /app/
EXPOSE 5001
CMD [ "npm", "start"]
#or without dependencies
# CMD [ "nodemon","app.js"]
