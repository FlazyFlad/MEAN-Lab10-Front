FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build /usr/local/app/dist/my-angular-app /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf 

EXPOSE 4200