FROM node:20

WORKDIR /app

ARG VITE_HOSTNAME
ARG VITE_FORM_MAIL

ENV VITE_HOSTNAME=$VITE_HOSTNAME
ENV VITE_FORM_MAIL=$VITE_FORM_MAIL

ENV PORT=3000

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build:app

CMD ["npm", "run", "serve"]
