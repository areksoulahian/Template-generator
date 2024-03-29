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
import { generateJSserver } from './utils/jsGenerateServer.js';
// import ts templates
import { generateTSserver } from './utils/tsGenerateServer.js';
// import db templates
import { generateDBconfig } from './utils/generateDB.js';

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
      const serverJS = generateJSserver(answers);
      // templates variables TS
      const serverTS = generateTSserver(answers);
      // template DB
      const dbConfigData = generateDBconfig(answers);

      //generate
      generateProject({
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
        dbConfigData,
        serverJS,
        serverTS,
      });
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
          width: 80,
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
