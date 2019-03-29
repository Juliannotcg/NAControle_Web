FROM johnpapa/angular-cli as angular-app
RUN apk add --no-cache bash git openssh
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm i
COPY . /usr/src/app
RUN npm run build-qa-local

FROM nginx:alpine
WORKDIR /usr/src/app
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=angular-app /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
