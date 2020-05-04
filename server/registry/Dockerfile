FROM node:8.10-alpine as build
WORKDIR app
COPY package*.json ./
RUN npm install
COPY . /app/
CMD npm start

# Use extra slim production image
FROM m03geek/alpine-node:femto-8
COPY --from=build /app /
EXPOSE 8084
ENTRYPOINT ["node", "index.js"]