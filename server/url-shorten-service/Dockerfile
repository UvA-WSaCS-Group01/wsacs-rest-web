FROM node:8.10-alpine
WORKDIR app
COPY package.json /app/package.json
RUN npm install
COPY . /app/
EXPOSE 8083
CMD npm start