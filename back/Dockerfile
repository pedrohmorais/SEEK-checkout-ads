FROM node:latest
RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend
COPY package.json /usr/src/backend/
RUN npm install
COPY . /usr/src/backend
COPY docker.env ./.env
EXPOSE 3000
CMD [ “npm”, “start” ]