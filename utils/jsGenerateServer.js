export const generateJSserver = (answers) => {
  let mongooseVar = '';
  let sequelizeVar = '';
  let serverImport = '';
  let serverVar = '';
  let staticRoute = '';
  serverImport = '';
  // Express ------------------------------------------------------
  if (answers.framework.toLowerCase() === 'express') {
    serverImport += `// javascript express server
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import fs from 'fs-extra';`;
    serverVar += `const app = express();
const port = process.env.PORT || 3000;

// Define your routes
app.get(\${answers.route}\, async (req, res) => {
    const indexHTMLPath = path.join('index.html');

    // Read the HTML file
    fs.readFile(indexHTMLPath, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Internal Server Error');
        return;
    }

    // Send the HTML content in the response
    res.send(data);
    });
});

\${staticRoute}\

app.listen(port, () => {
console.log(\`Server running on http://localhost:\${port}\`);
});
`;
    staticRoute = `
// Serve static files
app.use(express.static(__dirname));`;
  }

  // Koa -------------------------------------------------------------
  else if (answers.framework.toLowerCase() === 'koa') {
    serverImport += `
import Koa from 'koa';
import koaStatic from 'koa-static';
import Router from 'koa-router';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import fs from 'fs-extra';`;
    serverVar += `
const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

app.use(async (ctx) => {
  const indexHTMLPath = path.join(__dirname, 'index.html');

  try {
    const data = await fs.readFile(indexHTMLPath, 'utf-8');
    ctx.body = data;
  } catch (err) {
    console.error('Error reading file:', err);
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
  }
});

// Define your routes
router.get('\${answers.route}\', async (ctx) => {
  try {
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

// Apply the router middleware
app.use(router.routes());

\${staticRoute}\

// Start the server
app.listen(port, () => {
  console.log(\`Server running on http://localhost:\${port}\`);
});`;
    staticRoute = `
// Serve static files
app.use(require('koa-static')(__dirname));`;
  }

  // Fastify ----------------------------------------------------
  else if (answers.framework.toLowerCase() === 'fastify') {
    serverImport += `
import fastify from 'fastify';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import fs from 'fs-extra';`;
    serverVar += `
const app = fastify();
const port = process.env.PORT || 3000; 

// define route
app.get('\${answers.route}\', async (request, reply) => {
  try {
    // Implement your logic here
    // Use the PostgreSQL pool to query the database
    // Example: const { rows } = await pool.query('SELECT * FROM your_table');
    // Return the response
    // return { message: 'Hello, Fastify with PostgreSQL!' };
    const indexHTMLPath = path.join('index.html');

    // Read the HTML file
    fs.readFile(indexHTMLPath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        reply.code(500).send('Internal Server Error');
        return;
      }

      // Send the HTML content in the response
      reply.send(data);
    });
  } catch (error) {
    console.error('Error occurred:', error);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
});

\${staticRoute}\

app.listen(port, (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(\`Server running on http://localhost:\${port}\`);
  }
});`;
    staticRoute = `
// Serve static files
app.register(require('fastify-static'), {
  root: __dirname,
});`;
  }

  // Hapi -------------------------------------------------------
  else if (answers.framework.toLowerCase() === 'hapi') {
    serverImport += `
import Hapi from 'hapi';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import fs from 'fs-extra';`;
    serverVar += `
// Define your routes
server.route({
  method: 'GET',
  path: '\${answers.route}\',
  handler: async (request, h) => {
    const indexHTMLPath = path.join(__dirname, 'index.html');

    try {
      const data = fs.readFileSync(indexHTMLPath, 'utf-8');
      return h.response(data).type('text/html');
    } catch (err) {
      console.error('Error reading file:', err);
      return h.response('Internal Server Error').code(500);
    }
  },
});

const startServer = async () => {
  // Serve static files
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, './'),
        redirectToSlash: true,
        index: true,
      },
    },
  });
  try {
    await server.start();
    console.log('Server running on %s', server.info.uri);
    console.log(\`Server running on http://localhost:\${port}\`);
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();`;
  } else {
    return null;
  }

  //  ORM Config
  if (answers.orm.toLowerCase() === 'mongoose') {
    mongooseVar = `import mongoose from 'mongoose';`;
  } else if (answers.orm.toLowerCase() === 'sequelize') {
    sequelizeVar = `import sequelizer, { Sequelize, DataTypes } from 'sequelizer';`;
  }

  return `${serverImport}
  ${mongooseVar}
  ${sequelizeVar}
  ${serverVar}
  ${staticRoute}`;
};
