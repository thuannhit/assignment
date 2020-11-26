# This repository shows that I am building a microservices systems
## Features of this example
This example is basically an API for some orders/news manager web application.
## Running the example with docker-compose
Execute `docker network create infrastructure && cp .env.example .env && docker-compose up -d` from the root of the repository
## Accessing the API itself and swagger docs for the API
- Once you launch the API it will be accessible on port 8000.
- Swagger docs for the API will be accessible locally via URI "**http://localhost:8000/api**"
## Launch services for integration testing (using docker-compose)
- Execute `cp .env.example .env && cp .env.test.example .env.test`
- Execute `docker-compose -f ./docker-compose.test.yml up -d` from the root of the repository
- Run `cd ./gateway && npm install && npm run test` from the root of this repo
- Run `cd ./ui-svc && npm install && npm run build && npm run dev:ssr` from the root of this repo
- `ui-svc` and `gateway` communicate via HTTP methods
## Brief architecture overview
This API showcase consists of the following parts:
- API gateway: navigate the requests to suitable services
    * EXAMPLE: Case register: gateway service will forward to "user" service for creating new user (worked)
                Case login: gateway service will forward to "auth" service for authentication and generating access_token and refresh_token (not working)
- Auth service - responsible for Authentication phase (It is still faced with some issue. Register function works, login/logout not working)
- User service - responsible for login/logout/register for users
- Mailer service - responsible for sending out emails to users
- Permission service - responsible for authorization steps - it is now pending - not working
- Order service - responsible for create/update.... orders
- The microservice communicate via TCP

