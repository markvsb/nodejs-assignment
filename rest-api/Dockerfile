FROM node:13-alpine

RUN apk add curl

RUN mkdir -p /app

WORKDIR /app

## Copy and install packages
COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .
RUN npm install --silent

COPY --chown=node:node . .

EXPOSE 8080

## run the application
CMD ["npm", "start"]