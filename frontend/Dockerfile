FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g live-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# ENV VUE_APP_API_URL=http://rest-api:3000
# ENV VUE_APP_WEBSOCKET_URL=ws://ws-server:8000

# build app for production with minification
RUN npm run build

EXPOSE 8080

CMD [ "live-server", "dist", "--port=8080", "--entry-file=index.html" ]