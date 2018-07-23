FROM node:latest
RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend
COPY package.json /usr/src/frontend/
RUN npm install
RUN npm install -g @angular/cli@1.7.1
COPY . /usr/src/frontend
EXPOSE 4200