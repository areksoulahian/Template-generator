// const { prompt } = require("inquirer");

const selectORM = async () => {
  const question = {
    type: "list",
    name: "orm",
    message: "Choose an ORM (Object-Relational Mapping) library:",
    choices: [
      "Sequelize",
      "TypeORM",
      "Mongoose",
      "Knex.js",
      "Entity Framework",
    ],
  };

  try {
    const answer = await prompt(question);
    console.log(`You selected ${answer.orm}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = selectORM;
