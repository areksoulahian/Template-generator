export const generatePackageJson = (answers, projectName) => {
  return JSON.stringify(
    {
      name: projectName,
      version: '1.0.0',
      description: 'Your project description',
      // ... other properties as needed ...
      type: 'module',
      main: 'server.js',
      scripts: {
        start: 'node .',
        dev: 'nodemon .',
      },
      dependencies: {
        [answers.framework.toLowerCase()]: 'latest',
        [answers.orm.toLowerCase()]: 'latest',
        [answers.database.toLowerCase()]: 'latest',
        [answers.websocket.toLowerCase()]: 'latest',
        dotenv: 'latest',
      },
      devDependencies: {
        [answers.linter.toLowerCase()]: 'latest',
        [answers['template engine'].toLowerCase()]: 'latest',
        [answers.unittester.toLowerCase()]: 'latest',
        nodemon: 'latest',
        '@babel/core': 'latest',
        '@babel/preset-env': 'latest',
      },
    },
    null,
    2, // Use 2 spaces for indentation
  );
};
