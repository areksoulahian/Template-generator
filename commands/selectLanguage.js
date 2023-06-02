// const { prompt } = require("inquirer");

const selectLanguage = async () => {
  const question = {
    type: "list",
    name: "language",
    message: "Choose a programming language:",
    choices: ["JavaScript", "Python", "Ruby"],
  };

  try {
    const answer = await prompt(question);
    console.log(`You selected ${answer.language}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = selectLanguage;
