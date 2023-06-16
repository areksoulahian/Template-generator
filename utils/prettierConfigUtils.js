export const generatePrettierConfig = (answers) => {
  return JSON.stringify(
    {
      semi: true,
      singleQuote: true,
      trailingComma: 'all',
      tabWidth: 2,
      printWidth: 80,
    },
    null,
    2, // Use 2 spaces for indentation
  );
};
