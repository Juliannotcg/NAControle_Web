FROM nginx:alpine
WORKDIR /usr/src/app
COPY ./build/qa-local/nginx.conf /etc/nginx/nginx.conf
COPY /dist /usr/share/nginx/html
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
