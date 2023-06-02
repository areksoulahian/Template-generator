// const { prompt } = require("inquirer");

const selectFramework = async () => {
  const question = {
    type: "list",
    name: "framework",
    message: "Choose a framework:",
    choices: [
      "Express.js",
      "Django",
      "Ruby on Rails",
      "ASP.NET Core",
      "Spring",
    ],
  };

  try {
    const answer = await prompt(question);
    console.log(`You selected ${answer.framework}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = selectFramework;
