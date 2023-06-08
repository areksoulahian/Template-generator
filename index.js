#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs-extra";
import ejs from "ejs";
import path from "path";
// import gradient from "gradient-string";
// import chalkAnimation from "chalk-animation";
import figlet from "figlet";
// import pkg from "nanospinner";
// const { createspinner } = pkg;
// import { packageJson } from "fs-extra";
import pkg from "fs-extra";
const { packageJson } = pkg;

const existingConfig = fs.existsSync("package.json");
const CURR_DIR = process.cwd();

// main questions
if (existingConfig) {
  inquirer
    .prompt([
      // Name project
      {
        type: "input",
        name: "project-name",
        message: chalk.green("Project name:"),
        validate: function (input) {
          if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
          else
            return "Project name may only include letters, numbers, underscores and hashes.";
        },
      },
      //choose language
      {
        type: "list",
        name: "language",
        message: chalk.green("Choose a programming language:"),
        choices: ["JavaScript" /*"Python", "Ruby"*/],
      },
      //choose framework
      {
        type: "list",
        name: "framework",
        message: chalk.green("Choose a framework:"),
        choices: (answers) => {
          console.log("Answers:", answers);
          console.log("Language:", answers.language);
          if (answers.language === "JavaScript") {
            return ["Express", "Koa", "Hapi", "Fastify"];
          } else if (answers.language === "Python") {
            return ["Django", "Flask", "FastAPI"];
          } else if (answers.language === "Ruby") {
            return ["Ruby on Rails", "Sinatra"];
          }
        },
      },
      //choose template engine
      {
        type: "list",
        name: "template engine",
        message: chalk.green("Choose a template engine:"),
        choices: (answers) => {
          if (answers.framework === "Express") {
            return ["ejs", "pug", "handlebars"];
          } else if (answers.framework === "Koa") {
            return ["ejs", "pug", "handlebars"];
          } else if (answers.framework === "Hapi") {
            return ["Vision"];
          } else if (answers.framework === "Fastify") {
            return ["Point of View"];
          }
        },
      },
      //choose database
      {
        type: "list",
        name: "database",
        message: chalk.green("Choose a database:"),
        choices: ["mysql", "postgres", "mongodb", "sqlite3"],
      },
      // choose orm
      {
        type: "list",
        name: "orm",
        message: chalk.green(
          "Choose an ORM (Object-Relational Mapping) library:"
        ),
        choices: (answers) => {
          if (answers.language === "JavaScript") {
            return ["sequelize", "mongoose"];
          } else if (answers.language === "Python") {
            return ["Django ORM", "SQLAlchemy"];
          } else if (answers.language === "Ruby") {
            return ["Active Record"];
          }
        },
      },
      //choose linter
      {
        type: "list",
        name: "linter",
        message: chalk.green("Choose a linter:"),
        choices: ["eslint", "None"],
      },
      //choose api router
      {
        type: "input",
        name: "route",
        message: chalk.green("Enter the API route:"),
        default: "/",
      },
      //choose unit tester
      {
        type: "list",
        name: "unittester",
        message: chalk.green("Choose a Unit Test:"),
        choices: (answers) => {
          if (answers.language === "JavaScript") {
            return ["jest", "mocha"];
          } else if (answers.language === "Python") {
            return ["", ""];
          } else if (answers.language === "Ruby") {
            return [""];
          }
        },
      },
    ])
    .then((answers) => {
      // Project name variable
      const projectName = answers["project-name"];

      console.log("These are your selected options below:");
      console.log("Project Name:", chalk.yellow(answers["project-name"]));
      console.log("Language:", chalk.yellow(answers.language));
      console.log("Framework:", chalk.yellow(answers.framework));
      console.log("Database:", chalk.yellow(answers.database));
      console.log("ORM:", chalk.yellow(answers.orm));
      console.log("Linter:", chalk.yellow(answers.linter));
      console.log("Unit Test:", chalk.yellow(answers.unittester));
      /*                    */
      console.log("");
      console.log("scaffolding project in " + `/output/${projectName}`);
      console.log("Done. Now run:");
      console.log("");
      console.log("cd " + `output/${projectName}`);
      console.log("npm install");
      console.log("npm run dev");

      // Load the appropriate template file
      const templateFilePath = `./templates/${answers.framework}-${answers.database}.js`;
      const template = fs.readFileSync(templateFilePath, "utf-8");

      // Render the template with the user-provided values
      const renderedTemplate = ejs.render(template, answers);
      // Save the generated code to the output file
      //const outputFilePath = `./output/${projectName}/${answers.framework}-${answers.database}.js`;
      const outputFilePath = `./output/${projectName}/server.js`;
      fs.ensureFileSync(outputFilePath);
      fs.writeFileSync(outputFilePath, renderedTemplate);

      //GITIGNORE START
      // Copy the .gitignore file to the output directory
      const gitignoreFilePath = path.join(`./templates`, ".gitignore");
      const gitignoreOutputPath = path.join(
        `./output/${projectName}`,
        ".gitignore"
      );
      fs.copySync(gitignoreFilePath, gitignoreOutputPath);
      //GITIGNORE END

      //PRETTIER START
      // copy prettier config file
      const prettierConfigFilePath = path.join(`./templates`, ".prettierrc");
      const prettierOutputFilePath = path.join(
        `./output/${projectName}`,
        ".prettierrc"
      );
      fs.copySync(prettierConfigFilePath, prettierOutputFilePath);
      //PRETTIER END

      //PACKAGE.JSON START PART 1
      // Generate the package.json contents
      const packageJsonContents = JSON.stringify(
        {
          name: projectName,
          version: "1.0.0",
          description: "Your project description",
          // ... other properties as needed ...
          main: "server.js",
          scripts: {
            start: "node .",
            dev: "nodemon .",
          },
          dependencies: {
            [answers.framework.toLowerCase()]: "latest",
            [answers.orm.toLowerCase()]: "latest",
            [answers.database.toLowerCase()]: "latest",
            dotenv: "latest",
          },
          devDependencies: {
            [answers.linter.toLowerCase()]: "latest",
            [answers["template engine"].toLowerCase()]: "latest",
            [answers.unittester.toLowerCase()]: "latest",
            nodemon: "latest",
            "@babel/core": "latest",
            "@babel/preset-env": "latest",
          },
        },
        null,
        2 // Use 2 spaces for indentation
      );
      //PACKAGE.JSON END PART 1

      // README START
      // Generate README.md contents
      const readmeContents = `
# ${projectName}

This is a README file for your project. Feel free to update it with relevant information about your project.

## Getting Started

1. Install dependencies:
  \`\`\`
  npm install
  \`\`\`

2. Start the development server:
  \`\`\`
  npm run dev
  \`\`\`

## License

This project is licensed under the [MIT License](LICENSE).
`;

      // Write the README.md file in the output directory
      const readmeFilePath = path.join(`./output/${projectName}/`, "README.md");
      fs.writeFileSync(readmeFilePath, readmeContents);
      // README end

      //BABEL START
      // Generate .babelrc contents
      const babelConfig = {
        presets: ["@babel/preset-env"],
      };

      // Write the .babelrc file in the output directory
      const babelConfigFilePath = path.join(
        `./output/${projectName}/`,
        ".babelrc"
      );
      fs.writeFileSync(
        babelConfigFilePath,
        JSON.stringify(babelConfig, null, 2)
      );
      //BABEL END

      // ESLINT START
      if (answers.linter === "eslint") {
        const eslintConfig = {
          env: {
            browser: true,
            node: true,
          },
          extends: ["eslint:recommended"],
          parserOptions: {
            ecmaVersion: 2021,
          },
          rules: {
            // Add your custom rules here
          },
        };

        // Write the ESLint config to the .eslintrc file
        const eslintConfigFilePath = path.join(
          `./output/${projectName}/`,
          ".eslintrc"
        );
        fs.writeFileSync(
          eslintConfigFilePath,
          JSON.stringify(eslintConfig, null, 2)
        );
      }
      //ESLINT END

      //DOTENV START
      // Create .env file contents
      const envContents = `
        PORT=3000
        `;

      // Write the .env file in the output directory
      const envFilePath = path.join(`./output/${projectName}/`, ".env");
      fs.writeFileSync(envFilePath, envContents);
      //DOTENV END

      //UNIT TESTING START
      //JEST START
      // Generate Jest configuration file
      if (answers.unittester.toLowerCase() === "jest") {
        const jestConfig = {
          // Jest configuration options
          testEnvironment: "node",
          testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
          collectCoverage: true,
          coverageDirectory: "coverage",
        };

        // Write the jest.config.js file in the output directory
        const jestConfigFilePath = path.join(
          `./output/${projectName}/`,
          "jest.config.js"
        );
        fs.writeFileSync(
          jestConfigFilePath,
          `module.exports = ${JSON.stringify(jestConfig, null, 2)};`
        );
      }
      // JEST END
      //MOCHA START
      // Generate Mocha configuration file
      if (answers.unittester.toLowerCase() === "mocha") {
        const mochaConfig = {
          // Mocha configuration options
          reporter: "spec",
          require: "mocha-common-setup.js",
          recursive: true,
          timeout: 5000,
        };

        // Write the mocha.opts file in the output directory
        const mochaConfigFilePath = path.join(
          `./output/${projectName}/`,
          "mocha.opts"
        );
        fs.writeFileSync(
          mochaConfigFilePath,
          JSON.stringify(mochaConfig, null, 2)
        );
      }
      //MOCHA END
      //UNIT TESTING END

      //PACKAGE.JSON START PART 2
      // Write the package.json file in the output directory
      const packageJsonFilePath = path.join(
        `./output/${projectName}/`,
        "package.json"
      );
      fs.writeFileSync(packageJsonFilePath, packageJsonContents);
      //PACKAGE.JSON END PART 2

      //figlet
      figlet.text(
        "Code Complete!",
        {
          font: "Standard",
          horizontalLayout: "default fitted full",
          verticalLayout: "default",
          width: 120,
          whitespaceBreak: true,
        },
        function (err, data) {
          if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
          }
          console.log(data);
        }
      );

      // End figlet
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.error("Prompt couldn't be rendered in the current environment");
      } else {
        console.error("Something else went wrong:", error);
      }
    });
}
