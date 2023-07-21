<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Running the app with Docker

 ```
  1. Make sure you have docker installed in your machine
  2. Look at .env.example and change what is necessary
  3. follow the following steps
    ( use sudo if necessary )
    $ docker-compose build
    $ docker-compose up
  4. Done! Now you can read the following guideline to learn how to use this api
 ``` 
## Acústica api Guideline

 ```
  This api was made specifically to deliver to frontend acustica-app 
    -> https://github.com/lucasklafke/acustica-app
  But, feel free to use it!
  
  Guideline 
    Routes 
      --> There are three usable routes 
        --> auth route
        --> question route
        --> category route

    Auth route
    ------------------------------------------------------------------
      This route will help you to navigate into other endpoints, without it you can't create and update questions or categories!
      You can logging in with
        username: john
        password: changeme

    Question route
    ------------------------------------------------------------------
    Use this route to create, update and find questions, you can search for questions without access tokens but to create and update you will need verify your veracity logging in
      NOTE: YOU CAN'T CREATE USERS
 ``` 
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

