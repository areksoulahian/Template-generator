# Create Template Generator CLI

Using Nodejs

- inquirer module
- chalk
- fs-extra
- path

## Choose Language

- javascript (complete)
- typescript (complete)

## Choose Template

- Node Rest Api (complete)
- Node Realtime Server ( complete)

## Choose Framework REST API

- express (complete)
- fastify (complete)
- koa (complete)
- hapi (complete)

# Realtime Server (incomplete)

- Socket.io ( complete)

## Template Engine (complete)

- ejs (complete)
- pug (complete)
- handlebars (complete)

## Choose DB (complete)

- mongodb (complete)
- mysql (complete)
- postgres (complete)
- sqlite3 (complete)

## Choose ORM (complete)

- Sequelize (complete)
- mongoose (complete)

## Needs Unit test options

- jest (complete)
- mocha (complete)

## Choose type of linter (complete)

- eslint (complete)
- None

## needs to contain following files (complete)

need to create individual config files based on the configuration of the user to scaffold the entire application

- git config (complete)
- pretter config (complete)
- lint config (complete)
- babel config (complete)
- dotenv config (complete)
- package.json (complete)
- - w/ dev dependencies
- - w/ scripts
- tsconfig.json (complete)

## Needs to be dockerized

- docker.config file is needed ( incomplete )

## Notes

- this template generator is an unopinionated scaffolding generator based on user input
- the user input will generate necessary config files
- based on that json file it will scaffold project by looking for existing template with those specifications

### where to improve

- Hard coded html index file ( complete )
- - need to figure out to dynamically serve

- use dotenv for database config ( complete )
- sequalize and mongoose question ( complete )
- script for test mocha jest and for lint ( complete )

### make these template files into a javascript export file to handle conditionals

- typescript templates for typescript ( complete-ish )
- connect socket to server in templates ( complete-ish )
- properly integrate the database with server files ( complete-ish )

- Dockerize to connect to database easier ( incomplete )

# file structure for scaffolding all projects( incomplete )

- server.js
- socket-server.js
- routes/ ( routing for different files )
  - index.js
- models/ ( this is where the schema is)
  - User.js
- views/ ( this is where the template engine html viewing is)
  - index.ejs
- controllers/ ( logic for certain files )
  - userController.js
- config/ ( db configuration file )
  - db.js
