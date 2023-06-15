#!/usr/bin/env node

// import ejs from "ejs";
// import path from "path";
// const { packageJson } = pkg;
// import pkg from "fs-extra";
import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs-extra";
import figlet from "figlet";
import {
  promptQuestions,
  generateProject,
} from "../Template-gen-project/utils/utils.js";
import { generatePackageJson } from "./utils/jsPackageUtils.js";
import { generateTsConfig } from "./utils/tsConfigUtils.js";
import { generateEslintConfig } from "./utils/eslintConfigUtils.js";
import { generatePrettierConfig } from "./utils/prettierConfigUtils.js";
import { generateGitignore } from "./utils/gitignoreUtils.js";
import { generateReadme } from "./utils/readmeUtils.js";
import { generateDotenv } from "./utils/dotenvUtils.js";
import { generateBabelConfig } from "./utils/babelConfigUtils.js";
import {
  generateMochaConfig,
  generateJestConfig,
} from "./utils/unitTestConfigUtils.js";

const existingConfig = fs.existsSync("package.json");
const CURR_DIR = process.cwd();
const template_dir = `./templates`;

// main questions
if (existingConfig) {
  inquirer
    .prompt(promptQuestions)
    .then((answers) => {
      // Project name variable
      const projectName = answers["project-name"];
      const packageJsonData = generatePackageJson(answers, projectName);
      const tsConfigData = generateTsConfig(answers);
      const eslintConfigData = generateEslintConfig(answers);
      const prettierConfigData = generatePrettierConfig(answers);
      const gitignoreData = generateGitignore(answers);
      const readmeData = generateReadme(answers);
      const dotenvData = generateDotenv();
      const babelConfigData = generateBabelConfig();
      const mochaConfigData = generateMochaConfig(answers);
      const jestConfigData = generateJestConfig(answers);

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
        jestConfigData
      );
      // console log
      console.log("Project Name:", chalk.yellow(projectName));
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
      console.log(
        "Optional packages: npm i bycryptjs jsonwebtoken cookie-parser"
      );
      console.log("");
      console.log("cd " + `output/${projectName}`);
      console.log("npm install");
      console.log("npm run dev");

      // // Load the appropriate template file
      // const templateFilePath = `./templates/${answers.framework}-${answers.database}.js`;
      // const template = fs.readFileSync(templateFilePath, "utf-8");

      // // Render the template with the user-provided values
      // const renderedTemplate = ejs.render(template, answers);

      // // Create the output directory
      // const outputDir = path.join(CURR_DIR, `output/${projectName}`);
      // fs.ensureDirSync(outputDir);

      // // Save the generated code to the output file
      // const outputFilePath = path.join(outputDir, "server.js");
      // fs.writeFileSync(outputFilePath, renderedTemplate);

      // //GITIGNORE START
      // // Copy the .gitignore file to the output directory
      // const gitignoreFilePath = path.join(template_dir, ".gitignore");
      // const gitignoreOutputPath = path.join(outputDir, ".gitignore");
      // fs.copySync(gitignoreFilePath, gitignoreOutputPath);
      // //GITIGNORE END

      // //PRETTIER START
      // // copy prettier config file
      // const prettierConfigFilePath = path.join(template_dir, ".prettierrc");
      // const prettierOutputFilePath = path.join(outputDir, ".prettierrc");
      // fs.copySync(prettierConfigFilePath, prettierOutputFilePath);
      // //PRETTIER END

      // // README START
      // // Generate README.md contents
      // const readmeContents = `# ${projectName}

      //   This is a README file for your project. Feel free to update it with relevant information about your project.

      //   ## Getting Started

      //   0. cd output/${projectName}

      //   1. Install dependencies:
      //     - npm install

      //   2. Start the development server:
      //     - npm run dev

      //   ## License

      //   This project is licensed under the [MIT License](LICENSE).`;

      // // Write the README.md file in the output directory
      // const readmeFilePath = path.join(outputDir, "README.md");
      // fs.writeFileSync(readmeFilePath, readmeContents);
      // // README end

      // //BABEL START
      // // Generate .babelrc contents
      // const babelConfig = {
      //   presets: ["@babel/preset-env"],
      // };

      // // Write the .babelrc file in the output directory
      // const babelConfigFilePath = path.join(outputDir, ".babelrc");
      // fs.writeFileSync(
      //   babelConfigFilePath,
      //   JSON.stringify(babelConfig, null, 2)
      // );
      // //BABEL END

      // // ESLINT START
      // if (answers.linter === "eslint") {
      //   const eslintConfig = {
      //     env: {
      //       browser: true,
      //       node: true,
      //     },
      //     extends: ["eslint:recommended"],
      //     parserOptions: {
      //       ecmaVersion: 2021,
      //     },
      //     rules: {
      //       // Add your custom rules here
      //     },
      //   };

      //   // Write the ESLint config to the .eslintrc file
      //   const eslintConfigFilePath = path.join(outputDir, ".eslintrc");
      //   fs.writeFileSync(
      //     eslintConfigFilePath,
      //     JSON.stringify(eslintConfig, null, 2)
      //   );
      // }
      // //ESLINT END

      // //DOTENV START
      // // Create .env file contents
      // const envContents = `PORT=3000`;

      // // Write the .env file in the output directory
      // const envFilePath = path.join(outputDir, ".env");
      // fs.writeFileSync(envFilePath, envContents);
      // //DOTENV END

      // //UNIT TESTING START
      // //JEST START
      // // Generate Jest configuration file
      // if (answers.unittester.toLowerCase() === "jest") {
      //   const jestConfig = {
      //     // Jest configuration options
      //     testEnvironment: "node",
      //     testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
      //     collectCoverage: true,
      //     coverageDirectory: "coverage",
      //   };

      //   // Write the jest.config.js file in the output directory
      //   const jestConfigFilePath = path.join(outputDir, "jest.config.js");
      //   fs.writeFileSync(
      //     jestConfigFilePath,
      //     `module.exports = ${JSON.stringify(jestConfig, null, 2)};`
      //   );
      // }
      // // JEST END
      // //MOCHA START
      // // Generate Mocha configuration file
      // if (answers.unittester.toLowerCase() === "mocha") {
      //   const mochaConfig = {
      //     // Mocha configuration options
      //     reporter: "spec",
      //     require: "mocha-common-setup.js",
      //     recursive: true,
      //     timeout: 5000,
      //   };

      //   // Write the mocha.opts file in the output directory
      //   const mochaConfigFilePath = path.join(outputDir, "mocha.opts");
      //   fs.writeFileSync(
      //     mochaConfigFilePath,
      //     JSON.stringify(mochaConfig, null, 2)
      //   );
      // }
      // //MOCHA END
      // //UNIT TESTING END

      // //PACKAGE.JSON START
      // // Generate the package.json contents
      // const packageJsonContents = JSON.stringify(
      //   {
      //     name: projectName,
      //     version: "1.0.0",
      //     description: "Your project description",
      //     // ... other properties as needed ...
      //     main: "server.js",
      //     scripts: {
      //       start: "node .",
      //       dev: "nodemon .",
      //     },
      //     dependencies: {
      //       [answers.framework.toLowerCase()]: "latest",
      //       [answers.orm.toLowerCase()]: "latest",
      //       [answers.database.toLowerCase()]: "latest",
      //       dotenv: "latest",
      //     },
      //     devDependencies: {
      //       [answers.linter.toLowerCase()]: "latest",
      //       [answers["template engine"].toLowerCase()]: "latest",
      //       [answers.unittester.toLowerCase()]: "latest",
      //       nodemon: "latest",
      //       "@babel/core": "latest",
      //       "@babel/preset-env": "latest",
      //     },
      //   },
      //   null,
      //   2 // Use 2 spaces for indentation
      // );

      // // Write the package.json file in the output directory
      // const packageJsonFilePath = path.join(outputDir, "package.json");
      // fs.writeFileSync(packageJsonFilePath, packageJsonContents);

      // //PACKAGE.JSON END

      // //TSCONFIG START
      // // Generate TypeScript configuration files
      // if (answers.language.toLowerCase() === "typescript") {
      //   // Add tsconfig.json file
      //   const tsconfigContents = {
      //     compilerOptions: {
      //       target: "es6",
      //       module: "commonjs",
      //       strict: true,
      //       esModuleInterop: true,
      //       outDir: "./dist",
      //     },
      //     include: ["./src/**/*"],
      //     exclude: ["./node_modules"],
      //   };

      //   const tsconfigFilePath = path.join(outputDir, "tsconfig.json");
      //   fs.writeFileSync(
      //     tsconfigFilePath,
      //     JSON.stringify(tsconfigContents, null, 2)
      //   );
      // }

      // //TSCONFIG END

      //figlet
      figlet.text(
        "hack responsibly",
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
