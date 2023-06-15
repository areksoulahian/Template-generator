export const generateBabelConfig = () => {
  return JSON.stringify(
    {
      presets: ["@babel/preset-env"],
    },
    null,
    2 // Use 2 spaces for indentation
  );
};
