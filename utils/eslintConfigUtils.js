export const generateEslintConfig = (answers) => {
  if (answers.linter === "eslint") {
    return JSON.stringify(
      {
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
      },
      null,
      2 // Use 2 spaces for indentation
    );
  }

  return null;
};
