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
        choices: ["JavaScript", "Python", "Ruby"],
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
        choices: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
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
            return ["Sequelize", "Mongoose"];
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
        choices: ["eslint", "tslint", "jshint", "None"],
      },
      //choose api router
      {
        type: "input",
        name: "route",
        message: chalk.green("Enter the API route:"),
        default: "/api/example",
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
      const outputFilePath = `./output/${projectName}/${answers.framework}-${answers.database}.js`;
      fs.ensureFileSync(outputFilePath);
      fs.writeFileSync(outputFilePath, renderedTemplate);

      // Copy the .gitignore file to the output directory
      const gitignoreFilePath = path.join(`./templates`, ".gitignore");
      const gitignoreOutputPath = path.join(
        `./output/${projectName}`,
        ".gitignore"
      );
      fs.copySync(gitignoreFilePath, gitignoreOutputPath);

      // copy prettier config file
      const prettierConfigFilePath = path.join(`./templates`, ".prettierrc");
      const prettierOutputFilePath = path.join(
        `./output/${projectName}`,
        ".prettierrc"
      );
      fs.copySync(prettierConfigFilePath, prettierOutputFilePath);

      // Generate the package.json contents
      const packageJsonContents = JSON.stringify(
        {
          name: projectName,
          version: "1.0.0",
          description: "Your project description",
          // ... other properties as needed ...
          dependencies: {
            [answers.framework.toLowerCase()]: "latest",
            [answers.orm.toLowerCase()]: "latest",
            [answers.database.toLowerCase()]: "latest",
          },
          devDependencies: {
            [answers.linter.toLowerCase()]: "latest",
            [answers["template engine"].toLowerCase()]: "latest",
            [answers.unittester.toLowerCase()]: "latest",
          },
        },
        null,
        2 // Use 2 spaces for indentation
      );

      // Write the package.json file in the output directory
      const packageJsonFilePath = path.join(
        `./output/${projectName}/`,
        "package.json"
      );
      fs.writeFileSync(packageJsonFilePath, packageJsonContents);

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
