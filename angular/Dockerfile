# Stage 1: Build the Angular application
FROM node:lts-alpine as build-step
WORKDIR /app
ENV NODE_ENV=production
ENV TARGET_PATH=/docs
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# --production=false install devDependenecies, which are required for build process
RUN npm install --production=false
COPY . .
RUN npm run build

#Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=build-step /docs /usr/share/nginx/html
COPY ./ssl/localhost.crt /etc/nginx/ssl/localhost.crt
COPY ./ssl/localhost.key /etc/nginx/ssl/localhost.key
COPY ./nginx.conf /etc/nginx/nginx.conf