# Dogtolib-back

## Prerequisites
In order to install the project locally your will need the following:
- Nodejs version 16 or up
- npm
- a local and empty Postgresql database accessible via password auth (md5)

## Installation
- Clone the repository and run `npm install` to install dependencies.
- To create database structure load the .sql files in migrations/deploy into your local database using psql.
- Load a minimal dataset by loading de file data/seeding.sql using psql.
- Create a .env file based on .env.sample and edit PG_* variables to connect to local database.
- Optionnaly you can load a randomely generated veterinary dataset by launching the data/fake.js script

## Starting
- Run `npm run dev` to run in debug mode or simply `npm start` to run in production mode

## Usage
Nearly all routes require authentification, you will first need to register a new user by using /auth/register route.
API documentation is available at https://dogtolib.herokuapp.com/api-docs
