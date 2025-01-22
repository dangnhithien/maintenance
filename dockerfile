# Stage 1
FROM node:20.17.0 AS build
WORKDIR /app
COPY . ./

RUN npm install
RUN npm run build

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
