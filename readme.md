# Create Template Generator CLI

- Using

## Choose Template

- Node Rest Api
- Node Realtime Server
- Node Serverside application

## Choose Framework

- Rest api
- - Express
- - Fastify
- - Koa
- - Hapi
- - Vanilla Nodejs

- Realtime Server
- - Socket.js
- - Socket.io
- - Other
- - Other

- Serverside Application
- - NestJS
- - EJS (template Engine)
- - Pug (template Engline)

## Choose DB

- MongoDB
- MySQL
- PostgreSQL

## Choose ORM

- typeORM
- SQLize

* needs to contain following files

- git config
- lint config
- package.json w/ scripts ex: {start: node server.js}
- docker.config
- Unit test environment

####

need to create individual config files based on the configuration of the user to scaffold the entire application

####

- the user input will generate a json file
- based on that json file it will scaffold project by looking for existing template with those specifications
