export const generateKoa = (answers) => {
  let mongooseVar = '';
  let sequelizeVar = '';
  let socketVar = '';
  let socketConfig = '';
  let koaImportVar = '';
  let koaServerVar = '';

  // framework headers import
  if (answers.framework.toLowerCase() === 'koa') {
    koaImportVar = `import koa from 'koa';
    import dotenv from 'dotenv';
    dotenv.config();
    import path from 'path';
    import fs from 'fs-extra';`;
    koaServerVar = `// Create Koa app and HTTP server
    const app = new Koa();
    const server = http.createServer(app.callback());
    // Serve static files (e.g., index.html)
    app.use(serve(path.join(__dirname, 'public')));
    // Rest of the Koa app setup and routes
    sequelize
      .sync()
      .then(() => {
        server.listen(PORT, () => {
          console.log(\`Server listening on port ${PORT}\`);
        });
      })
      .catch((error) => {
        console.error('Error starting server:', error);
        process.exit(1);
      });
`;
  } else {
    return null;
  }

  //  ORM Config
  if (answers.orm.toLowerCase() === 'mongoose') {
    mongooseVar = `import mongoose from 'mongoose';`;
  } else if (answers.orm.toLowerCase() === 'sequelize') {
    sequelizeVar = `import sequelizer from 'sequelizer';`;
  }

  return `
    ${koaImportVar}
    ${mongooseVar}
    ${sequelizeVar}`;
};
