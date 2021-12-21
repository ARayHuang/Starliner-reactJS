# stage 0
FROM node:14.1-alpine AS build-stage

WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY . /app/
RUN npm run build:alpha:linux

# stage 1
FROM nginx:1.15
COPY --from=build-stage /app/public/ /usr/share/nginx/html

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
