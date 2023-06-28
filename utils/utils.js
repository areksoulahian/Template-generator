import chalk from 'chalk';
import fs from 'fs-extra';
import ejs from 'ejs';
import path from 'path';

const CURR_DIR = process.cwd();

export const promptQuestions = [
  // Name project
  {
    type: 'input',
    name: 'project-name',
    message: chalk.green('Project name:'),
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return 'Project name may only include letters, numbers, underscores and hashes.';
    },
  },
  //choose language
  {
    type: 'list',
    name: 'language',
    message: chalk.green('Choose a programming language:'),
    choices: ['JavaScript', 'Typescript'],
  },
  //choose framework
  {
    type: 'list',
    name: 'framework',
    message: chalk.green('Choose a framework:'),
    choices: (answers) => {
      if (
        answers.language === 'JavaScript' ||
        answers.language === 'Typescript'
      ) {
        return ['Express', 'Koa', 'Hapi', 'Fastify'];
      }
    },
  },
  //choose template engine
  {
    type: 'list',
    name: 'template engine',
    message: chalk.green('Choose a template engine:'),
    choices: (answers) => {
      console.log('template engine break');
      if (
        answers.framework === 'Express' ||
        answers.framework === 'Koa' ||
        answers.framework === 'Hapi' ||
        answers.framework === 'Fastify'
      ) {
        return ['ejs', 'pug', 'handlebars'];
      }
    },
  },
  //choose database
  {
    type: 'list',
    name: 'database',
    message: chalk.green('Choose a database:'),
    choices: ['mysql', 'pg', 'mongodb', 'sqlite3'],
  },
  // choose orm
  {
    type: 'list',
    name: 'orm',
    message: chalk.green('Choose an ORM (Object-Relational Mapping) library:'),
    choices: (answers) => {
      if (
        answers.database === 'mysql' ||
        answers.database === 'pg' ||
        answers.database === 'sqlite3'
      ) {
        return ['sequelize'];
      } else if (answers.database === 'mongodb') {
        return ['mongoose'];
      }
    },
  },
  //choose linter
  {
    type: 'list',
    name: 'linter',
    message: chalk.green('Choose a linter:'),
    choices: ['eslint', 'None'],
  },
  //choose api router
  {
    type: 'input',
    name: 'route',
    message: chalk.green('Enter the API route:'),
    default: '/',
  },
  //choose unit tester
  {
    type: 'list',
    name: 'unittester',
    message: chalk.green('Choose a Unit Test:'),
    choices: (answers) => {
      if (
        answers.language === 'JavaScript' ||
        answers.language === 'Typescript'
      ) {
        return ['jest', 'mocha'];
      }
    },
  },
  //choose Websocket
  {
    type: 'list',
    name: 'websocket',
    message: chalk.green('Do you want websocket?'),
    choices: ['socketio', 'none'],
  },
];

export const generateProject = ({
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
}) => {
  // Project name variable
  const projectName = answers['project-name'];

  // // Load the appropriate template file
  // const templateFilePath = `./templates/${answers.framework}-${answers.database}.js`;
  // const template = fs.readFileSync(templateFilePath, 'utf-8');

  // //Load TS template files
  // const tsTemplateFilePath = `./tsTemplates/${answers.framework}-${answers.database}.ts`;
  // const tsTemplate = fs.readFileSync(tsTemplateFilePath, 'utf-8');

  // // Render the template with the user-provided values
  // const renderedTemplate = ejs.render(template, answers);
  // // Render the  Typescript template with the user-provided values
  // const renderedTSTemplate = ejs.render(tsTemplate, answers);

  // Create the output directory
  const outputDir = path.join(CURR_DIR, `output/${projectName}`);
  fs.ensureDirSync(outputDir);

  // Create the views directory
  const viewsDir = path.join(CURR_DIR, `output/${projectName}/views/`);
  fs.ensureDirSync(viewsDir);

  // Create the routes directory
  const routesDir = path.join(CURR_DIR, `output/${projectName}/routes/`);
  fs.ensureDirSync(routesDir);

  // models
  const modelsDir = path.join(CURR_DIR, `output/${projectName}/models/`);
  fs.ensureDirSync(modelsDir);

  // controllers
  const controllersDir = path.join(
    CURR_DIR,
    `output/${projectName}/controllers/`,
  );
  fs.ensureDirSync(controllersDir);

  // config
  const configDir = path.join(CURR_DIR, `output/${projectName}/config/`);
  fs.ensureDirSync(configDir);

  // Save the generated code to the output file

  const outputFilePath = path.join(outputDir, 'server.js');
  // fs.writeFileSync(outputFilePath, renderedTemplate);
  fs.writeFileSync(outputFilePath, serverJS);

  // Save the generated Typescript code to the output file
  const outputTSFilePath = path.join(outputDir, 'server.ts');
  // fs.writeFileSync(outputTSFilePath, renderedTSTemplate);
  fs.writeFileSync(outputTSFilePath, serverTS);

  // generate db.js config file
  if (dbConfigData) {
    const dbConfigFilePath = path.join(outputDir, 'config', 'db.js');
    fs.writeFileSync(dbConfigFilePath, dbConfigData);
  }

  // Write the package.json file in the output directory
  const packageJsonFilePath = path.join(outputDir, 'package.json');
  fs.writeFileSync(packageJsonFilePath, packageJsonData);

  // Write the TypeScript configuration file in the output directory
  if (tsConfigData) {
    const tsConfigFilePath = path.join(outputDir, 'tsconfig.json');
    fs.writeFileSync(tsConfigFilePath, tsConfigData);
  }

  // Write the ESLint configuration file in the output directory
  const eslintConfigFilePath = path.join(outputDir, '.eslintrc');
  fs.writeFileSync(eslintConfigFilePath, eslintConfigData);

  // Write the Prettier configuration file in the output directory
  const prettierConfigFilePath = path.join(outputDir, '.prettierrc');
  fs.writeFileSync(prettierConfigFilePath, prettierConfigData);

  // Write the .gitignore file in the output directory
  const gitignoreFilePath = path.join(outputDir, '.gitignore');
  fs.writeFileSync(gitignoreFilePath, gitignoreData);

  // Generate README.md contents
  const readmeFilePath = path.join(outputDir, 'README.md');
  fs.writeFileSync(readmeFilePath, readmeData);

  // Write the .env file in the output directory
  const envFilePath = path.join(outputDir, '.env');
  fs.writeFileSync(envFilePath, dotenvData);

  // Write the .babelrc file in the output directory
  const babelConfigFilePath = path.join(outputDir, '.babelrc');
  fs.writeFileSync(babelConfigFilePath, babelConfigData);

  // Write the Index.html file in the output directory
  const indexHTMLPath = path.join(outputDir, 'index.html');
  fs.writeFileSync(indexHTMLPath, indexHTML);

  // Write the style.css file in the output directory
  const styleCSSPath = path.join(outputDir, 'styles.css');
  fs.writeFileSync(styleCSSPath, styleCSS);

  // Write the Mocha configuration file in the output directory
  if (mochaConfigData) {
    const mochaConfigFilePath = path.join(outputDir, 'mocha.opts');
    fs.writeFileSync(mochaConfigFilePath, mochaConfigData);
  }

  // Write the Jest configuration file in the output directory
  if (jestConfigData) {
    const jestConfigFilePath = path.join(outputDir, 'jest.config.js');
    fs.writeFileSync(jestConfigFilePath, jestConfigData);
  }

  // Write the socket io file
  if (socketIOConfig) {
    const socketConfigFilePath = path.join(outputDir, 'socket-server.js');
    fs.writeFileSync(socketConfigFilePath, socketIOConfig);
  }
};
