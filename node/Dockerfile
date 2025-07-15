FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Install wget and dockerize
RUN apk add --no-cache wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/v0.9.3/dockerize-linux-amd64-v0.9.3.tar.gz | tar xzf - -C /usr/local/bin

EXPOSE 3000

# Use dockerize to wait for the database, then run npm start
CMD ["/usr/local/bin/dockerize", "-wait", "tcp://db:3306", "-timeout", "20s", "npm", "start"]
