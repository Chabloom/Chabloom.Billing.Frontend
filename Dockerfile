FROM node:lts AS build-env
WORKDIR /app

COPY . ./
RUN npx yarn install
RUN npx yarn build

FROM nginx:stable
COPY --from=build-env /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
RUN chmod +x nginx/env.sh
COPY nginx/env.sh /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html
EXPOSE 80
CMD ["/bin/bash", "-c", "./env.sh && nginx -g \"daemon off;\""]
