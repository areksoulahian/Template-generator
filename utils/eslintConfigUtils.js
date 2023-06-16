export const generateEslintConfig = (answers) => {
  if (answers.linter === 'eslint') {
    return JSON.stringify(
      {
        env: {
          browser: true,
          node: true,
          es6: true,
        },
        extends: [
          'eslint:recommended',
          'plugin:prettier/recommended',
          // 'plugin:react/recommended',
        ],
        parserOptions: {
          ecmaVersion: 2021,
        },
        rules: {
          /* */
          /* uncomment custom rules to your liking */
          /* */
          // 'no-console': 'warn',
          // 'no-unused-vars': 'error', // Warn when variables are declared but not used
          // quotes: ['error', 'single'], // Enforce the use of single quotes
          // 'no-var': 'error', // Prefer using let or const instead of var
          // 'max-len': ['warn', { code: 80 }], // Limit line length to 80 characters
          // indent: ['error', 2],// Use 2 spaces for indentation
          // semi: ['error', 'always'], // Enforce the use of semicolons
          // 'func-style': ['error', 'expression'], // Enforce using function expressions
          // 'no-trailing-spaces': 'warn', // Warn when there are trailing spaces at the end of lines
          // 'consistent-return': 'error', // Enforce consistent return statements
          // 'no-throw-literal': 'error', // Require throwing Error objects instead of literals
        },
        plugins: [
          'prettier',
          //'react',
        ],
      },
      null,
      2, // Use 2 spaces for indentation
    );
  }

  return null;
};
