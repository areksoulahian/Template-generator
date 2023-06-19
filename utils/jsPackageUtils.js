export const generatePackageJson = (answers, projectName) => {
  const packageJson = {
    name: projectName,
    version: '1.0.0',
    description: 'Your project description',
    // ... other properties as needed ...
    type: 'module',
    main: 'server.js',
    scripts: {
      start: 'node .',
      dev: 'nodemon .',
      lint: 'eslint .',
    },
    dependencies: {
      [answers.framework.toLowerCase()]: 'latest',
      [answers.orm.toLowerCase()]: 'latest',
      [answers.database.toLowerCase()]: 'latest',
      [answers.websocket.toLowerCase()]: 'latest',
      [answers['template engine'].toLowerCase()]: 'latest',
      dotenv: 'latest',
    },
    devDependencies: {
      [answers.linter.toLowerCase()]: 'latest',
      [answers['template engine'].toLowerCase()]: 'latest',
      [answers.unittester.toLowerCase()]: 'latest',
      nodemon: 'latest',
      '@babel/core': 'latest',
      '@babel/preset-env': 'latest',
      'eslint-plugin-prettier': 'latest',
    },
  };
  // Conditionally add dependency
  if (answers.framework.toLowerCase() === 'hapi') {
    packageJson.dependencies['@hapi/vision'] = 'latest';
  }
  if (answers.framework.toLowerCase() === 'fastify') {
    packageJson.dependencies['@fastify/view'] = 'latest';
  }

  // conditionally add scripts
  if (answers.unittester.toLowerCase() === 'jest') {
    packageJson.scripts['test'] = 'jest';
  }
  if (answers.unittester.toLowerCase() === 'mocha') {
    packageJson.scripts['test'] = 'mocha';
  }
  //return as string
  return JSON.stringify(
    packageJson,
    null,
    2, // Use 2 spaces for indentation
  );
};
