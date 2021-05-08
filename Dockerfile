FROM node:lts AS build-env
WORKDIR /app

# Copy yarn config and install as distinct layers
ADD .yarn ./.yarn
COPY .yarnrc.yml ./
COPY yarn.lock ./
COPY package.json ./
RUN npx yarn install

# Copy everything else and build
COPY . ./
RUN npx yarn build

FROM nginx:stable
COPY --from=build-env /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
COPY .env /usr/share/nginx/html
COPY nginx/env.sh /usr/share/nginx/html
RUN chmod +x /usr/share/nginx/html/env.sh
WORKDIR /usr/share/nginx/html
EXPOSE 80
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
