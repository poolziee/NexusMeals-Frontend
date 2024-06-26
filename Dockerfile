FROM node:18-alpine3.17 as build

WORKDIR /app
COPY . /app

ENV VITE_HOST_URL="/api"

RUN npm install
RUN npm run build

FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build /app/dist /var/www/html/
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443
CMD ["nginx","-g","daemon off;"]