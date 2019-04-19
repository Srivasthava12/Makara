FROM node

# Create app directory
WORKDIR /user/src/app

COPY package*.json ./

RUN npm install
COPY . .

CMD [ "npm", "start" ]