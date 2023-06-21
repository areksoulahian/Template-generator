export const generatePackageJson = (answers, projectName) => {
  const packageJson = {
    name: projectName,
    version: '1.0.0',
    description: 'Your project description',
    // ... other properties as needed ...
    // type: 'module',
    main: 'server.js',
    scripts: {
      start: 'node .',
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
  // conditionally add typescript dev dependencies
  if (answers.language.toLowerCase() === 'typescript') {
    packageJson.devDependencies['typescript'] = 'latest';
    packageJson.devDependencies['ts-node'] = 'latest';
    packageJson.devDependencies['@types/node'] = 'latest';
    packageJson.devDependencies['@types/fs-extra'] = 'latest';
    if (answers.framework.toLowerCase() === 'express') {
      packageJson.devDependencies['@types/express'] = 'latest';
    }
    if (answers.framework.toLowerCase() === 'koa') {
      // packageJson.dependencies['koa'] = 'latest';
      packageJson.devDependencies['@types/koa'] = 'latest';
      packageJson.devDependencies['@types/koa-router'] = 'latest';
    }
    if (answers.framework.toLowerCase() === 'fastify') {
      // packageJson.dependencies['fastify'] = 'latest';
      packageJson.devDependencies['@types/fastify'] = 'latest';
    }
    if (answers.framework.toLowerCase() === 'hapi') {
      // packageJson.dependencies['hapi'] = 'latest';
      packageJson.devDependencies['@types/hapi'] = 'latest';
    }
  }
  // Typescript ORM config
  if (
    answers.language.toLowerCase() === 'typescript' &&
    answers.orm.toLowerCase() === 'mongoose'
  ) {
    packageJson.devDependencies['@types/mongoose'] = 'latest';
  }
  if (
    answers.language.toLowerCase() === 'typescript' &&
    answers.orm.toLowerCase() === 'sequelize'
  ) {
    packageJson.devDependencies['@types/sequelize'] = 'latest';
  }

  // main config
  if (answers.language.toLowerCase() === 'typescript') {
    packageJson.main = 'server.ts';
  } else if (answers.language.toLowerCase() === 'javascript') {
    packageJson.main = 'server.js';
  }
  // script type dev dependency
  if (answers.language.toLowerCase() === 'typescript') {
    packageJson.scripts['dev'] = 'nodemon --exec ts-node ./server.ts';
  } else if (answers.language.toLowerCase() === 'javascript') {
    packageJson.scripts['dev'] = 'nodemon .';
  }
  if (answers.language.toLowerCase() == 'typescript') {
    packageJson.scripts['build'] = 'build": "tsc -p tsconfig.json';
  }

  //return as string
  return JSON.stringify(
    packageJson,
    null,
    2, // Use 2 spaces for indentation
  );
};
