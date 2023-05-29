FROM node:18-alpine as build
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM nginx:1.23.4-alpine
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]