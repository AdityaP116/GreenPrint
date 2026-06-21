# Frontend Dockerfile
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# SPA routing config with dynamic PORT support for Cloud Run
COPY nginx.conf.template /etc/nginx/templates/de