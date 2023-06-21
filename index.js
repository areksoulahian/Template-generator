#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import figlet from 'figlet';
import { promptQuestions, generateProject } from './utils/utils.js';
import { generatePackageJson } from './utils/jsPackageUtils.js';
import { generateTsConfig } from './utils/tsConfigUtils.js';
import { generateEslintConfig } from './utils/eslintConfigUtils.js';
import { generatePrettierConfig } from './utils/prettierConfigUtils.js';
import { generateGitignore } from './utils/gitignoreUtils.js';
import { generateReadme } from './utils/readmeUtils.js';
import { generateDotenv } from './utils/dotenvUtils.js';
import { generateBabelConfig } from './utils/babelConfigUtils.js';
import {
  generateMochaConfig,
  generateJestConfig,
} from './utils/unitTestConfigUtils.js';
import { generateSocket } from './utils/socketUtils.js';
import { generateWelcomePage } from './utils/welcomePageUtils.js';
import { generateWelcomePageCSS } from './utils/welcomePageCSSUtils.js';
// import js templates
import { generateExpressMongoJS } from './templateJSUtils/express-mongodb-js.js';
import { generateExpressPgJS } from './templateJSUtils/express-pg-js.js';
import { generateExpressMysqlJS } from './templateJSUtils/express-mysql-js.js';
import { generateExpressSqlite3JS } from './templateJSUtils/express-sqlite3-js.js';
import { generateHapiMongoJS } from './templateJSUtils/hapi-mongodb-js.js';
import { generateHapiPgJS } from './templateJSUtils/hapi-pg-js.js';
import { generateHapiMysqlJS } from './templateJSUtils/hapi-mysql-js.js';
import { generateHapiSqlite3JS } from './templateJSUtils/hapi-sqlite3-js.js';
import { generateKoaMongoJS } from './templateJSUtils/koa-mongodb-js.js';
import { generateKoaPgJS } from './templateJSUtils/koa-pg-js.js';
import { generateKoaMysqlJS } from './templateJSUtils/koa-mysql-js.js';
import { generateKoaSqlite3JS } from './templateJSUtils/koa-sqlite3-js.js';
import { generateFastifyMongoJS } from './templateJSUtils/fastify-mongodb-js.js';
import { generateFastifyPgJS } from './templateJSUtils/fastify-pg-js.js';
import { generateFastifyMysqlJS } from './templateJSUtils/fastify-mysql-js.js';
import { generateFastifySqlite3JS } from './templateJSUtils/fastify-sqlite3-js.js';
// import ts templates
import { generateExpressMongoTS } from './templateJSUtils/express-mongodb-ts.js';
import { generateExpressPgTS } from './templateJSUtils/express-pg-ts.js';
import { generateExpressMysqlTS } from './templateJSUtils/express-mysql-ts.js';
import { generateExpressSqlite3TS } from './templateJSUtils/express-sqlite3-ts.js';
import { generateHapiMongoTS } from './templateJSUtils/hapi-mongodb-ts.js';
import { generateHapiPgTS } from './templateJSUtils/hapi-pg-ts.js';
import { generateHapiMysqlTS } from './templateJSUtils/hapi-mysql-ts.js';
import { generateHapiSqlite3TS } from './templateJSUtils/hapi-sqlite3-ts.js';
import { generateKoaMongoTS } from './templateJSUtils/koa-mongodb-ts.js';
import { generateKoaPgTS } from './templateJSUtils/koa-pg-ts.js';
import { generateKoaMysqlTS } from './templateJSUtils/koa-mysql-ts.js';
import { generateKoaSqlite3TS } from './templateJSUtils/koa-sqlite3-ts.js';
import { generateFastifyMongoTS } from './templateJSUtils/fastify-mongodb-ts.js';
import { generateFastifyPgTS } from './templateJSUtils/fastify-pg-ts.js';
import { generateFastifyMysqlTS } from './templateJSUtils/fastify-mysql-ts.js';
import { generateFastifySqlite3TS } from './templateJSUtils/fastify-sqlite3-ts.js';

const existingConfig = fs.existsSync('package.json');

// main questions
if (existingConfig) {
  inquirer
    .prompt(promptQuestions)
    .then((answers) => {
      // Project name variable
      const projectName = answers['project-name'];
      const packageJsonData = generatePackageJson(answers, projectName);
      const tsConfigData = generateTsConfig(answers);
      const eslintConfigData = generateEslintConfig(answers);
      const prettierConfigData = generatePrettierConfig(answers);
      const gitignoreData = generateGitignore(answers);
      const readmeData = generateReadme(answers);
      const dotenvData = generateDotenv(answers);
      const babelConfigData = generateBabelConfig();
      const mochaConfigData = generateMochaConfig(answers);
      const jestConfigData = generateJestConfig(answers);
      const socketIOConfig = generateSocket(answers);
      const indexHTML = generateWelcomePage(answers);
      const styleCSS = generateWelcomePageCSS();

      // templates variables JS
      const expressMongoJS = generateExpressMongoJS(answers);
      const expressMysqlJS = generateExpressMysqlJS(answers);
      const expressPgJS = generateExpressPgJS(answers);
      const expressSqlite3JS = generateExpressSqlite3JS(answers);
      const hapiMongoJS = generateHapiMongoJS(answers);
      const hapiMysqlJS = generateHapiMysqlJS(answers);
      const hapiPgJS = generateHapiPgJS(answers);
      const hapiSqlite3JS = generateHapiSqlite3JS(answers);
      const fastifyMongoJS = generateFastifyMongoJS(answers);
      const fastifyMysqlJS = generateFastifyMysqlJS(answers);
      const fastifyPgJS = generateFastifyPgJS(answers);
      const fastifySqlite3JS = generateFastifySqlite3JS(answers);
      const koaMongoJS = generateKoaMongoJS(answers);
      const koaMysqlJS = generateKoaMysqlJS(answers);
      const koaPgJS = generateKoaPgJS(answers);
      const koaSqlite3JS = generateKoaSqlite3JS(answers);

      // templates variables TS
      const expressMongoTS = generateExpressMongoTS(answers);
      const expressMysqlTS = generateExpressMysqlTS(answers);
      const expressPgTS = generateExpressPgTS(answers);
      const expressSqlite3TS = generateExpressSqlite3TS(answers);
      const hapiMongoTS = generateHapiMongoTS(answers);
      const hapiMysqlTS = generateHapiMysqlTS(answers);
      const hapiPgTS = generateHapiPgTS(answers);
      const hapiSqlite3TS = generateHapiSqlite3TS(answers);
      const fastifyMongoTS = generateFastifyMongoTS(answers);
      const fastifyMysqlTS = generateFastifyMysqlTS(answers);
      const fastifyPgTS = generateFastifyPgTS(answers);
      const fastifySqlite3TS = generateFastifySqlite3TS(answers);
      const koaMongoTS = generateKoaMongoTS(answers);
      const koaMysqlTS = generateKoaMysqlTS(answers);
      const koaPgTS = generateKoaPgTS(answers);
      const koaSqlite3TS = generateKoaSqlite3TS(answers);

      //generate
      generateProject(
        answers,
        packageJsonData,
        tsConfigData,
        eslintConfigData,
        prettierConfigData,
        gitignoreData,
        readmeData,
        dotenvData,
        babelConfigData,
        mochaConfigData,
        jestConfigData,
        socketIOConfig,
        indexHTML,
        styleCSS,
      );
      // console log
      console.log('Project Name:', chalk.yellow(projectName));
      console.log('Language:', chalk.yellow(answers.language));
      console.log('Framework:', chalk.yellow(answers.framework));
      console.log('Database:', chalk.yellow(answers.database));
      console.log('ORM:', chalk.yellow(answers.orm));
      console.log('Template Engine:', chalk.yellow(answers['template engine']));
      console.log('Linter:', chalk.yellow(answers.linter));
      console.log('Unit Test:', chalk.yellow(answers.unittester));
      console.log('WebSocket:', chalk.yellow(answers.websocket));
      /*                    */
      console.log('');
      console.log('scaffolding project in ' + `/output/${projectName}`);
      console.log('Done. Now run:');
      console.log('');
      console.log(
        'Optional packages: npm i bycryptjs jsonwebtoken cookie-parser',
      );
      console.log('');
      console.log('cd ' + `output/${projectName}`);
      console.log('npm install');
      console.log('npm run dev');

      //figlet
      figlet.text(
        'hack responsibly',
        {
          font: 'Standard',
          horizontalLayout: 'default fitted full',
          verticalLayout: 'default',
          width: 120,
          whitespaceBreak: true,
        },
        function (err, data) {
          if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
          }
          console.log(data);
        },
      );

      // End figlet
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.error("Prompt couldn't be rendered in the current environment");
      } else {
        console.error('Something else went wrong:', error);
      }
    });
}
