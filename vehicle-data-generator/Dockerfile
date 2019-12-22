from node:13-alpine

RUN mkdir -p /app

WORKDIR /app

## Copy and install packages
COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .
RUN npm install --silent

COPY --chown=node:node . .

## run the application
CMD ["node", "index.js"]