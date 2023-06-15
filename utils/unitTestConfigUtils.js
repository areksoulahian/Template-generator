export const generateMochaConfig = (answers) => {
  if (answers.unittester.toLowerCase() === 'mocha') {
    return JSON.stringify(
      {
        reporter: 'spec',
        require: 'mocha-common-setup.js',
        recursive: true,
        timeout: 5000,
      },
      null,
      2, // Use 2 spaces for indentation
    );
  }

  return null;
};

export const generateJestConfig = (answers) => {
  if (answers.unittester.toLowerCase() === 'jest') {
    return `module.exports = {
    // Jest configuration options
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
    collectCoverage: true,
    coverageDirectory: "coverage",
  };
  `;
  }

  return null;
};
