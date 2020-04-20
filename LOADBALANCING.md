# Loadbalancing Demo

This demo demonstrates an exemplanatory implementation of how loadbalacing can be implemented using nginx.
To run this demo you need:

- `docker`
- `docker-compose`
- `Postman`

## Setup

- Build container images with `docker-compose build`
- Import collection `WSACS Assignment.postman_collection.json` into Postman.

## Run Microservice Ensemble 

To start the Microservices plus the nginx loadbalancer just use:

- `docker-compose up`

## Create And Login User

First we need to create and login a user by running the postman API-calls 
- 01 Create User
- 02 Login User

The authentication token returned by the servies is automatically set as a environment variable in postman.

## Add Data To Url Shorten Services

Now we can shorten a URL with API-Call `03 Shorten URL` and retrieve the identifier of the shortend URL.

## Retrieve Data

If we now query the server we see that API-Calls both `04 Get All` and `04 Get One` return different results when executed multiple times. This is because the NGINX server round-robin schedules the different requests to the two different microservies.

As the microservies, for the purpose of this demo, hold the data themselves in memory this is the expected results. However, this can be solved by:
- Sharing state by making servies stateless (i.e., a single shared storage - for example, a distributed data storage such as REDIS).
- Implement session stickyness so that requests from the same client get redirected to the same servies for a given period of time.

## Session Stickyness

NGINX provides the `hash` and `ip_hash` config settings for such behaviour. Alternatively, this could be implemented on a client or serverside by setting headers that define which servies the request should be directed to. However, ideally servies do not require such information to operate. 

To change NGINX to use session stickyness we can change the file `reverseproxy/conf.d/nginx.conf` by changing `    # hash $remote_addr consistent;` to `    hash $remote_addr consistent;`.

We further need to restart the servies (via `docker-compose stop` & `docker-compose run`) (❗ notice this will cause data loss) or direct NGINX to reload the config with the following steps:
- `docker-compose exec loadbalancer sh` to open a shell
- `/usr/sbin/nginx -s reload` to reload the nginx config

## Client-Based Demonstration:

As our postman client uses always the same IP, we can demonstrate workings of two different clients executing another shell on a different client:

- for client 1 `docker-compose run client sh`

and execute:

- login: `LOGINTOKEN=$(curl --request POST 'http://loadbalancer:80/users/login' --header 'Content-Type: application/json' --data-raw '{"username": "lucien","password":"123password"}')`
- request: `curl --request GET 'http://loadbalancer:80/' --header "Authorization: Bearer $LOGINTOKEN" --header 'Content-Type: application/json'`

## Details

Further details are found in the respective assignment document.
