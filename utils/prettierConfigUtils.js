export const generatePrettierConfig = (answers) => {
  return JSON.stringify(
    {
      semi: true,
      singleQuote: true,
      trailingComma: "all",
    },
    null,
    2 // Use 2 spaces for indentation
  );
};
