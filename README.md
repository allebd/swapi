# swapi

The Star Wars API

[![CircleCI](https://circleci.com/gh/allebd/swapi.svg?style=svg)](https://circleci.com/gh/allebd/swapi)
[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)
[![Coverage Status](https://coveralls.io/repos/github/allebd/swapi/badge.svg?branch=develop)](https://coveralls.io/github/allebd/swapi?branch=develop)

## Table of Contents

* [About](#swapi)
* [Required Features](#required-features)
* [Pivotal Tracker](#pivotal-tracker)
* [Heroku Deployment](#heroku-deployment)
* [Swagger Documentation](#swagger-documentation)
* [Technologies Used](#technologies-used)
* [Acknowledgements](#acknowledgements)
* [Author](#author)

## Required Features

* Listing the names of Star Wars movies along with their opening crawls and comment counts.
* Getting the character list for a movie.
* Adding anonymous comments for a movie.
* Listing anonymous comments for a movie.

## Pivotal Tracker

Pivotal Tracker Stories can found here [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2400605)

## Heroku Deployment

Application was deployed to Heroku. Use public URL [https://swapi-allebd.herokuapp.com](https://swapi-allebd.herokuapp.com) with API endpoints.

## Swagger Documentation

API Documentation was generated with [Swagger](https://swapi-allebd.herokuapp.com/docs).

## Technologies Used

* [Node-js](https://nodejs.org/en/) Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.
* [PostgreSQL](https://www.postgresql.org/) used for setting up relational database
* [Sequelize](https://sequelize.org//) a Node.js ORM for Postgres
* [Babel](https://babeljs.io/) used for transpiling codes from ES6 to ES5
* [Mocha](https://mochajs.org/) used for setting up tests
* [Chai](https://www.chaijs.com/) an assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
* [Docker](https://www.docker.com/) helps securely build, share and run modern applications anywhere

## Installations

### Getting started

* You need to have Git, Node, NPM and Docker installed on your computer.
* Installing [Node](node) automatically comes with npm.

### Clone

* Clone this project to your local machine `https://github.com/allebd/swapi.git`

### Setup

* Installing the project dependencies
  > Run the command below

```shell
   npm install
```

* Start your node server
  > run the command below

```shell
  npm start
```

* Use `http://localhost:3000` as base url for endpoints

### Endpoints

| METHOD | DESCRIPTION                             | ENDPOINTS
| ------ | --------------------------------------- | -------------------------
| GET    | Listing the names of Star Wars movies   | `/api/v1/movies`
| GET    | Getting the character list for a movie  | `/api/v1/movie/:episodeId/characters`
| POST   | Adding anonymous comments for a movie   | `/api/v1/movie/:episodeId/comments`
| GET    | Listing anonymous comments for a movie  | `/api/v1/movie/:episodeId/comments`
| GET    | Get API Documentation                   | `/docs`

### Running Unit Test

* Run test for all endpoints
  > run the command below
  
```shell
  npm test
```

## Acknowledgements

* [Paystack](https://paystack.com/)

## Author

[Bella Oyedele](https://github.com/allebd)
