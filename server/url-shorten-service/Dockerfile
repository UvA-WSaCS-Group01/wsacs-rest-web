FROM node:8.10-alpine as build
WORKDIR app
# Copy package.json + package-lock.json to use layer caching
COPY package*.json ./
RUN npm install
COPY . /app/

# Use extra slim production image
FROM m03geek/alpine-node:femto-8
COPY --from=build /app /
EXPOSE 8082
ENTRYPOINT ["node", "index.js"]