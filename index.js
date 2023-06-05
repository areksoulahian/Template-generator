#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs-extra";
import ejs from "ejs";
import path from "path";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import pkg from "nanospinner";
const { createspinner } = pkg;

const existingConfig = fs.existsSync("package.json");

// main questions
if (existingConfig) {
  inquirer
    .prompt([
      // Name project
      {
        type: "text",
        name: "name",
        message: chalk.bgWhiteBright("what is the name of the project?"),
        choices: path.basename(process.cwd()),
      },
      //choose language
      {
        type: "list",
        name: "language",
        message: chalk.bgBlueBright("Choose a programming language:"),
        choices: ["JavaScript" /* "Python", "Ruby" */],
      },
      //choose framework
      {
        type: "list",
        name: "framework",
        message: chalk.bgCyanBright("Choose a framework:"),
        choices: (answers) => {
          if (answers.language === "JavaScript") {
            return ["Express", "Adonis", "Sails"];
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
        message: chalk.bgYellowBright("Choose a template engine:"),
        choices: (answers) => {
          if (answers.framework === "Express") {
            return ["ejs", "pug", "mustache"];
          }
        },
      },
      //choose database
      {
        type: "list",
        name: "database",
        message: chalk.bgRedBright("Choose a database:"),
        choices: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Firebase"],
      },
      // choose orm
      {
        type: "list",
        name: "orm",
        message: chalk.bgCyanBright(
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
        message: chalk.bgBlueBright("Choose a linter:"),
        choices: ["ESLint", "TSLint", "JSHint", "None"],
      },
      //choose api router
      {
        type: "input",
        name: "route",
        message: chalk.bgGreenBright("Enter the API route:"),
        default: "/api/example",
      },
      //choose unit tester
      {
        type: "list",
        name: "unittester",
        message: chalk.bgMagentaBright("Choose a Unit Test:"),
        choices: (answers) => {
          if (answers.language === "JavaScript") {
            return ["Jest", "Mocha"];
          } else if (answers.language === "Python") {
            return ["", ""];
          } else if (answers.language === "Ruby") {
            return [""];
          }
        },
      },
    ])
    .then((answers) => {
      console.log("Project Name:", answers.name);
      console.log("These are your selected options below:");
      console.log("Language:", answers.language);
      console.log("Framework:", answers.framework);
      console.log("Database:", answers.database);
      console.log("ORM:", answers.orm);
      console.log("Linter:", answers.linter);
      console.log("Unit Test:", answers.unittester);
      /*                    */

      // Load the appropriate template file
      const templateFilePath = `./templates/${answers.framework}-${answers.database}.js`;
      const template = fs.readFileSync(templateFilePath, "utf-8");

      // Render the template with the user-provided values
      const renderedTemplate = ejs.render(template, answers);

      // Save the generated code to the output file
      const outputFilePath = `./output/${answers.framework}-${answers.database}.js`;
      fs.ensureFileSync(outputFilePath);
      fs.writeFileSync(outputFilePath, renderedTemplate);

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
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.error("Prompt couldn't be rendered in the current environment");
      } else {
        console.error("Something else went wrong:", error);
      }
    });
}
