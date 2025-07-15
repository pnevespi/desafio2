FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
RUN apt update \
    && apt install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/v0.9.3/dockerize-linux-amd64-v0.9.3.tar.gz | tar xzf - -C /usr/local/bin 
