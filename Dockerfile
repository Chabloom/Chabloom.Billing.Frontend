FROM node:lts AS build-env
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN npx yarn install
COPY . ./
RUN npx yarn build

FROM nginx:stable
COPY --from=build-env /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
