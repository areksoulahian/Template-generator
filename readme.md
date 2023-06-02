# Create Template Generator CLI

- Using Nodejs
- - inquirer module
- - chalk
- - fs-extra
- - path

## Choose Template

- Node Rest Api
- Node Realtime Server
- Node Serverside application

## Choose Framework REST API

- Express
- Fastify
- Koa
- Hapi
- Vanilla Nodejs

# Realtime Server

- Socket.js
- Socket.io
- Other
- Other

## Serverside Application

- NextJS
- EJS (template Engine)
- Pug (template Engline)

## Choose DB

- MongoDB
- MySQL
- PostgreSQL

## Choose ORM

- typeORM
- Sequelize

## Needs Unit test options

- Jest
- Mocha
- etc.

## needs to contain following files

- need to create individual config files based on the configuration of the user to scaffold the entire application
- git config
- lint config
- package.json w/ scripts ex: {start: node server.js}

## Needs to be dockerized

- docker.config file is needed

## Notes

- the user input will generate a json file
- based on that json file it will scaffold project by looking for existing template with those specifications
