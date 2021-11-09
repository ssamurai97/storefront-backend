 
# Storefront_backend api

## Getting Started

This project contains a node and Express app Store Backend API


 To clone the project to your local machine 

``git clone https://github.com/ssamurai97/storefront-backend.git``

- ``cd storefront-backend``
-  `npm insall ` to install dependencies


to get started developing 

for getting with [postgres](https://www.postgresql.org/docs/current/app-psql.html) for documentation and installation 

In PSQL Shell

+ create user and password.
+ `CREATE USER backend_dev WITH PASSWORD 'password123!;`
+ create 2 databases 1 for development, and 1 for testing.
+ `CREATE DATABASE store_backend;`
+ `\c store_backend` 
+ `GRANT ALL PRIVILEGES ON DATABASE store_backend TO backend_dev`;
+ `CREATE DATABASE store_backend_test;`
+ `\c store_backend_test;`
+ `GRANT ALL PRIVILEGES ON DATABASE store_backend TO backend_dev`


In Terminal 

+ for development Environment 
  * install **db-migrate** 
    * npm install -g db-migrate
  * manually change ENV=env in .env file
    * Run **db-migrate to populate database** 
    * Run ``npm run watch `` 
+ For Test Environment 
  * manually change ENV=test in .env file
    * run ``db-migrate to populate test database``
  * Run **npm run test** to run **Test**

### Libraries used in the project
 - Postgres for the database <https://node-postgres.com>
 - Node/Express for the application logic [express](https://expressjs.com/)
 - dotenv from npm for managing environment variables [dotenv](https://github.com/motdotla/dotenv#readme)
 - db-migrate from npm for migrations [db-migrate](https://db-migrate.readthedocs.io/en/latest/)
 - jsonwebtoken from npm for working with  [JWT](https://jwt.io)
 - jasmine from npm for testing [jasmine](https://jasmine.github.io/)
 - supertest for testing endpoints [supertest](https://openbase.com/js/supertest)
 - bcrypt from npm for hashing passwords [bcrypt](https://openbase.com/js/bcryptjs/documentation)



# Environments Variables

[env](./.env.example)
 + ` POSTGRES_HOST=localhost`
 + ` POSTGRES_DB=store_backend`
 + ` POSTGRES_USER=backend_dev`
 + ` POSTGRES_PASSWORD=password123`
 + ` POSTGRES_TEST_DB=store_backend_test`
 + ` ENV=dev`
 + ` PEPPER=hello-world`
 + ` SALT_ROUNDS=10`
 + ` TOKEN_SECRET=akdopajfdjaf`

###More Information 
you can find all endpoints and database schema in REQUIREMENT.md file
