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
- Node Realtime Server (incomplete)
- Node Serverside application (incomplete)

## Choose Framework REST API

- express (complete)
- fastify (complete)
- koa (complete)
- hapi (complete)

# Realtime Server (incomplete)

- webSocket (incomplete) npm ws
- Socket.io (incomplete) npm socket.io

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

## Choose bundler

- webpack (incomplete)
- parcel (incomplete)

## needs to contain following files (complete)

need to create individual config files based on the configuration of the user to scaffold the entire application

- git config (complete)
- pretter config (complete)
- lint config (complete)
- babel config (complete)
- dotenv config (complete)
- package.json w/ scripts ex: {start: node server.js} (complete)
- tsconfig.json (complete)

## Needs to be dockerized

- docker.config file is needed

## Notes

- this template generator is an unopinionated scaffolding generator based on user input
- the user input will generate necessary config files
- based on that json file it will scaffold project by looking for existing template with those specifications

### where to improve

- Hard coded html index file
- - need to figure out to dynamically serve
- Dockerize to connect to database easier
