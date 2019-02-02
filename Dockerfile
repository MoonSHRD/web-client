FROM node:10.8-alpine as build
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn

COPY . /app/
RUN SUBSCRIBE_ENDPOINT=wss://13.59.234.201.xip.io/subscriptions \
    GRAPHQL_ENDPOINT=/graphql \
    MATRIX_ENDPOINT="" \
    yarn build

FROM nginx:1.15.2-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
