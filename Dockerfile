FROM node:20

WORKDIR /app

ARG VITE_HOSTNAME_GENERICBACKEND

ENV VITE_HOSTNAME_GENERICBACKEND=$VITE_HOSTNAME_GENERICBACKEND

ENV PORT=3000

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build:app

CMD ["npm", "run", "serve"]
