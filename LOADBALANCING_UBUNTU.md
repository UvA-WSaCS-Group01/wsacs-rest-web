# Loadbalancing Demo

## Environment (Ubuntu 18.04)

This demo demonstrates an exemplanatory implementation of how loadbalacing can be implemented using nginx.
To run this demo you need:

- `docker (sudo apt install docker.io)`
- `docker-compose (sudo apt  install docker-compose)`
- `curl`

## Setup

- Build container images with `sudo docker-compose build`

### Run Microservice Ensemble

To start the Microservices plus the nginx loadbalancer just use:

- `sudo docker-compose up`

## Create And Login User

First we need to create and login a user by running the curl API-calls 
* Create User `curl -L -X POST 'http://localhost:8080/users' -H 'Content-Type: application/json' --data-raw '{"username": "lucien","password":"123password"}'`
* Login User `curl -L -X POST 'http://localhost:8080/users/login' -H 'Content-Type: application/json' --data-raw '{"username": "lucien","password":"123password"}'`

Copy the returned JWT Token, as it is needed for the next step.
Example JWT TOKEN:
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsdWNpZW4iLCJpYXQiOjE1ODczODA3NDV9.FVUUCivRJ5EvOQNUAVFBWGuR2GBXh3VfeZs70YSfYis`
## Add Data To Url Shorten Services

Now we can shorten an URL and retrieve the identifier of the shortend URL by running the curl API-call
* Shorten URL `curl -L -X POST 'http://localhost:8080/' -H 'Authorization: Bearer <JWT TOKEN HERE>' -H 'Content-Type: application/json' --data-raw '{"url":"http://www.nu.nl"}'`

This returns the ID of a shortened URL.

## Retrieve Data

If we now query the server we see that the following API Calls 
* Get All `curl -L -X GET 'http://localhost:8080/' -H 'Authorization: Bearer <JWT TOKEN HERE>' -H 'Content-Type: application/json'`
* Get One `curl -L -X GET 'http://localhost:8080/<ID HERE>' -H 'Content-Type: application/json'`

both return different results when executed multiple times. This is because the NGINX server round-robin schedules the different requests to the two different microservies.

As the microservies, for the purpose of this demo, hold the data themselves in memory this is the expected results. However, this can be solved by:
- Sharing state by making services stateless (i.e., a single shared storage - for example, a distributed data storage such as REDIS).
- Implement session stickyness so that requests from the same client get redirected to the same servies for a given period of time.

## Session Stickyness

NGINX provides the `hash` and `ip_hash` config settings for such behaviour. Alternatively, this could be implemented on a client or serverside by setting headers that define which services the request should be directed to. However, ideally services do not require such information to operate. 

To change NGINX to use session stickyness we can change the file `reverseproxy/conf.d/nginx.conf` by changing (uncommenting)`    # hash $remote_addr consistent;` to `    hash $remote_addr consistent;`.

We further need to restart the servies (via `sudo docker-compose stop` & `sudo docker-compose run`) (❗ notice this will cause data loss) 
OR 
Direct NGINX to reload the config with the following steps:
- `sudo docker-compose exec loadbalancer sh` to open a shell
- `/usr/sbin/nginx -s reload` to reload the nginx config

## Client-Based Demonstration:

As our postman client uses always the same IP, we can demonstrate workings of two different clients executing another shell on a different client:

- for client 1 `sudo docker-compose run client sh`

and execute:

- login: `LOGINTOKEN=$(curl --request POST 'http://loadbalancer:80/users/login' --header 'Content-Type: application/json' --data-raw '{"username": "lucien","password":"123password"}')`
- request: `curl --request GET 'http://loadbalancer:80/' --header "Authorization: Bearer $LOGINTOKEN" --header 'Content-Type: application/json'`

As can be seen, each call returns the same value, as session stickiness is now implemented.

## Details

Further details are found in the respective assignment document.
