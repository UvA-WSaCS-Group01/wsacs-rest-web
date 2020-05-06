# wsacs-rest-web
This is a REST-based web micro service architecture to shorten URLs with user authentication.

## Overview Docker & Kubernetes Deployment Files

The following two subsections list the different yaml used for the assingment.

### Docker

The files regarding the assignment can be found as listed below:

- GitHub Actions Build pipleine [.github\workflows\dockerimage.yml](.github\workflows\dockerimage.yml)
- docker-compose for building [docker-compose.build.yml](docker-compose.build.yml)
- url-service Dockerfile [server\url-shorten-service\Dockerfile](server\url-shorten-service\Dockerfile)
- user-service Dockerfile [server\user-service\Dockerfile](server\user-service\Dockerfile)
- Deployment docker-compose [docker-compose.yml](docker-compose.yml)

### Kubernetes Deployment Files

1. Cluster Setup
   - Calico Networking Addon [calico.yaml](calico.yaml)
   - Metrics Server [metrics-server.yaml](metrics-server.yaml)
2. Service Deployment
    - URL Shortner Service Deployment and Service [deploy-url-shortener.yaml](deploy-url-shortener.yaml)
    - User Service Deployment and Service [deploy-user.yaml](deploy-user.yaml)
3. Single Entrypoint / Loadbalacing
   - Ingress Controller [deploy-ingress-controller.yaml](deploy-ingress-controller.yaml)
   - Ingress Routes [ingress.yaml](ingress.yaml)
4. Health Service
    - See Deployment [deploy-url-shortener.yaml](deploy-url-shortener.yaml)
    - See Deployment [deploy-user.yaml](deploy-user.yaml)
5. Autoscaling
    - Autoscaling with Horizontal Pod Autoscaler [autoscaling.yaml](autoscaling.yaml)

## Additional Information for Testing Locally

### Installation Server
Server is built in the following environment:
- node `8.10.0` @ `Ubuntu 18.04`
- npm `3.5.2` @ `Ubuntu 18.04`

Prior running:
- Run `npm install` in the following directories:
  * `server/url-shorten-service`
  * `server/user-service`
  * `server/registry`

### Run the Registry Service
1. Run `npm run registry` to start the registry (do this before other sercices start).
2. Registry listens on `localhost:8084`

### Run the User Service

1. Run `npm run user-service` to start the user service.
2. User Service listens on `localhost:8083`

### Test the User Service
1. Run `curl -L -X POST 'http://localhost:8083/users' -H 'Content-Type: application/json' --data-raw '{"username": "lucien","password":"123password"}'` to create a user.
2. Run `curl -L -X POST 'http://localhost:8083/users/login' -H 'Content-Type: application/json' --data-raw '{"username": "lucien","password":"123password"}'` to receive the jwt token.

### Run the URL-Shortener Service

1. Run `npm run url-shortener` to start the url shortener service.
2. User Service listens on `localhost:8082`

### Test the URL-Shortener Service

* Run `curl -L -X POST 'http://localhost:8082/' -H 'Authorization: Bearer <JWT TOKEN HERE>' -H 'Content-Type: application/json' --data-raw '{"url":"http://www.nu.nl"}'` to shorten the URL and receive an ID.
* Run `curl -L -X GET 'http://localhost:8082/<ID HERE>' -H 'Content-Type: application/json'` to get the shortened URL
* Run `curl -L -X PUT 'http://localhost:8082/<ID HERE>' -H 'Authorization: Bearer <JWT TOKEN HERE>' -H 'Content-Type: application/json' --data-raw '{"url":"<NEW URL HERE>"}'` to update a shortened URL with a new URL.
* Run `curl -L -X DELETE 'http://localhost:8082/<ID HERE>' -H 'Authorization: Bearer <JWT TOKEN HERE>' -H 'Content-Type: application/json'` to delete a shortened URL
* Run `curl -L -X GET 'http://localhost:8082/' -H 'Authorization: Bearer <JWT TOKEN HERE>' -H 'Content-Type: application/json'` to get the list of IDs.
* Run `curl -L -X DELETE 'http://localhost:8082/' -H 'Authorization: Bearer <JWT TOKEN HERE>' -H 'Content-Type: application/json'` to delete all URLS

### Test the Registry Service

* Run `curl -L -X GET 'http://localhost:8084/health' -H 'Content-Type:application/json'` to get the locations of all services.

### Loadbalancing Demo:

- The demo for loadbalancing on windows 10 can be found [here](./LOADBALANCING.md) 
- The demo for loadbalancing on Ubuntu 18.04 can be found [here](./LOADBALANCING_UBUNTU.md)  
