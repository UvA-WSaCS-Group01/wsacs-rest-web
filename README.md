# wsacs-rest-web
This is a REST-based web micro service architecture to shorten URLs with user authentication.

## Installation Server
Server is built in the following environment:
- node `8.10.0` @ `Ubuntu 18.04`
- npm `6.14.4` @ `Ubuntu 18.04`

Prior running:
- Run `npm install` in the `server` folder.

## Run the User Service

1. Run `npm run user-service` to start the user service.
2. User Service listens on `localhost:8083`

## Test the User Service
1. Run `curl -L -X POST 'http://localhost:8083/users' -H 'Content-Type: application/json' --data-raw '{"username": "lucien","password":"123password"}'` to create a user.
2. Run `curl -L -X POST 'http://localhost:8083/users/login' -H 'Content-Type: application/json' --data-raw '{"username": "lucien","password":"123password"}'` to receive the jwt token.

## Run the URL-Shortener Service

1. Run `npm run url-shortener` to start the url shortener service.
2. User Service listens on `localhost:8082`

## Test the URL-Shortener Service

* Run `curl -L -X POST 'http://localhost:8082/' -H 'Authorization: Bearer <JWT TOKEN HERE>' -H 'Content-Type: application/json' --data-raw '{"url":"http://www.nu.nl"}'` to shorten the URL and receive an ID.
* Run `curl -L -X GET 'http://localhost/<ID HERE>' -H 'Content-Type: application/json'` to get the shortened URL
* Run `curl -L -X PUT 'http://localhost/<ID HERE>' -H 'Authorization: Bearer <JWT TOKEN HERE>' -H 'Content-Type: application/json' --data-raw '{"url":"<NEW URL HERE>"}'` to update a shortened URL with a new URL.
* Run `curl -L -X DELETE 'http://localhost/<ID HERE>' -H 'Authorization: Bearer <JWT TOKEN HERE>' -H 'Content-Type: application/json'` to delete a shortened URL
* Run `curl -L -X GET 'http://localhost/' -H 'Authorization: Bearer <JWT TOKEN HERE>' -H 'Content-Type: application/json'` to get the list of IDs.
* Run `curl -L -X DELETE 'http://localhost/' -H 'Authorization: Bearer <JWT TOKEN HERE>' -H 'Content-Type: application/json'` to delete all URLS
