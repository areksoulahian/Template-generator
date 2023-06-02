// const { question } = require("inquirer");

const selectDatabase = async () => {
  const question = {
    type: "list",
    name: "database",
    message: "Choose a database:",
    choices: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Firebase"],
  };

  try {
    const answer = await prompt(question);
    console.log(`You selected ${answer.database}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = selectDatabase;
