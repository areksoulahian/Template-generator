#!/usr/bin/env node

// const { prompt, default: inquirer } = require("inquirer");
// const fs = require("fs-extra");
// const path = require("path");
// const ejs = require("ejs");
import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs-extra";
import ejs from "ejs";
import path from "path";

const existingConfig = fs.existsSync("package.json");

// main questions
if (existingConfig) {
  inquirer
    .prompt([
      {
        type: "text",
        name: "name",
        message: "what is the name of the project?",
        choices: path.basename(process.cwd()),
      },
      {
        type: "list",
        name: "language",
        message: "Choose a programming language:",
        choices: ["JavaScript", "Python", "Ruby"],
      },
      {
        type: "list",
        name: "framework",
        message: "Choose a framework:",
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
      {
        type: "list",
        name: "template engine",
        message: "Choose a template engine:",
        choices: (answers) => {
          if (answers.framework === "Express") {
            return ["ejs", "pug", "mustache"];
          }
        },
      },
      {
        type: "list",
        name: "database",
        message: "Choose a database:",
        choices: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Firebase"],
      },
      {
        type: "list",
        name: "orm",
        message: "Choose an ORM (Object-Relational Mapping) library:",
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
      {
        type: "list",
        name: "linter",
        message: "Choose a linter:",
        choices: ["ESLint", "TSLint", "JSHint", "None"],
      },
      {
        type: "input",
        name: "route",
        message: "Enter the API route:",
        default: "/api/example",
      },
      {
        type: "list",
        name: "unittester",
        message: "Choose a Unit Test:",
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
      console.log(chalk.green("Project Name:", answers.name));
      console.log("Selected options:");
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

      console.log("Code generation completed!");
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.error("Prompt couldn't be rendered in the current environment");
      } else {
        console.error("Something else went wrong:", error);
      }
    });
}
