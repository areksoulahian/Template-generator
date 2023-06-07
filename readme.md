# Create Template Generator CLI

Using Nodejs

- inquirer module
- chalk
- fs-extra
- path

## Choose Language

- javascript
- python (incomplete)
- ruby (incomplete)

## Choose Template

- Node Rest Api
- Node Realtime Server (incomplete)
- Node Serverside application (incomplete)

## Choose Framework REST API

- Express
- Fastify
- Koa
- Hapi

# Realtime Server (incomplete)

- Socket.js (incomplete)
- Socket.io (incomplete)

## Template Engine

- EJS
- Pug
- handlebars

## Choose DB

- MongoDB
- MySQL
- PostgreSQL
- SQLite

## Choose ORM

- Sequelize
- mongoose

## Needs Unit test options

- Jest
- Mocha

## Choose type of linter

- ESLint
- TSLint

## needs to contain following files

- need to create individual config files based on the configuration of the user to scaffold the entire application
- git config
- pretter config
- package.json w/ scripts ex: {start: node server.js}
- lint config

## Needs to be dockerized

- docker.config file is needed

## Notes

- the user input will generate a json file
- based on that json file it will scaffold project by looking for existing template with those specifications
