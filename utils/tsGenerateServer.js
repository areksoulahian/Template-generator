export const generateTSserver = (answers) => {
  let mongoVar = '';
  let mongodbConfig = '';
  let mongooseVar = '';
  let mysqlVar = '';
  let mysqlConfig = '';
  let sqlite3Var = '';
  let pgVar = '';
  let pgConfig = '';
  let sqlite3Config = '';
  let sequelizeVar = '';
  let socketVar = '';
  let socketConfig = '';
  let expressImportVar = '';
  let fastifyImportVar = '';
  let koaImportVar = '';
  let hapiImportVar = '';
  let expressServerVar = '';
  let fastifyServerVar = '';
  let koaServerVar = '';
  let hapiServerVar = '';
  let envVar = '';
  if (answers.framework.toLowerCase() === 'typescript') {
    // environment Variables
    envVar = `const port = process.env.PORT || 3000;`;
    // framework headers import
    if (answers.framework.toLowerCase() === 'express') {
      expressImportVar = `import express, { Request, Response } from 'express';
      import dotenv from 'dotenv';
      dotenv.config();
      import path from 'path';
      import fs from 'fs-extra';`;
      expressServerVar = `// Create Express app
      const app = express();
      app.use(express.json());
      // to load static files
      app.use(express.static('./'));;
      // route
      app.get('/', (req: Request, res: Response) => {
        const indexHTMLPath = path.join(__dirname, 'index.html');
        fs.readFile(indexHTMLPath, 'utf-8', (err, data) => {
          if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
          }
          res.send(data);
        });
      });
      // Get
      app.get('/examples', async (req: Request, res: Response) => {
        try {
          // Retrieve all examples from the database
          const examples = await Example.find();
          res.json(examples);
        } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
        }
      });
      // Post
      app.post('/examples', async (req: Request, res: Response) => {
        try {
          // Create a new example object based on the request body
          const example = new Example(req.body);
          // Save the example object to the database
          await example.save();
          res.status(201).json(example);
        } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
        }
      });
      // Start the server
      app.listen(port, () => {
        console.log(\`Server running on http://localhost:\${port}\`);
      });`;
    } else if (answers.framework.toLowerCase() === 'fastify') {
      fastifyImportVar = `import fastify from 'fastify';
      import fastifyStatic from 'fastify-static';
      import dotenv from 'dotenv';
      dotenv.config();
      import path from 'path';
      import fs from 'fs-extra';`;
      fastifyServerVar = `ket: Socket) => {
          console.log('A client connected');
        
          socket.on('disconnect', () => {
            console.log('A client disconnected');
          });
        });
        
        
        // Start the server
        app.listen(port, (err, address) => {
          if (err) {
            console.error('Error starting server:', err);
            process.exit(1);
          }
          console.log(\`Server is listening on \${port}\`);
        });`;
    } else if (answers.framework.toLowerCase() === 'koa') {
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
            console.log(\`Server listening on port \${PORT}\`);
          });
        })
        .catch((error) => {
          console.error('Error starting server:', error);
          process.exit(1);
        });
  `;
    } else if (answers.framework.toLowerCase() === 'hapi') {
      hapiImportVar = `import hapi from 'hapi';
      import dotenv from 'dotenv';
      dotenv.config();
      import path from 'path';
      import fs from 'fs-extra';`;
      hapiServerVar = `const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: 'localhost',
      });
      // Load index.html on the root route
      server.route({
        method: 'GET',
        path: '/',
        handler: (_, h) => {
          return h.file(path.join(__dirname, 'public', 'index.html'));
        },
      });
      
      const startServer = async () => {
        try {
          await server.start();
          console.log('Server running at:', server.info.uri);
        } catch (error) {
          console.error('Error starting server:', error);
          process.exit(1);
        }
      };
      
      startServer();`;
    } else {
      return null;
    }

    // if socketio
    if (answers.websocket.toLowerCase() === 'socketio') {
      socketVar = `import { Server as SocketIOServer } from 'socket.io';`;
      socketConfig = `// Socket.IO integration
  const io = new SocketIOServer(server);
  io.on('connection', (socket) => {
      console.log('A client connected');
  
      socket.on('disconnect', () => {
      console.log('A client disconnected');
      });
  
      // Handle custom events here
  });`;
    }

    //  ORM Config
    if (answers.orm.toLowerCase() === 'mongoose') {
      mongooseVar = `import mongoose from 'mongoose';`;
    } else if (answers.orm.toLowerCase() === 'sequelize') {
      sequelizeVar = `import sequelizer, { Sequelize, DataTypes } from 'sequelizer';`;
    }

    //   // DB Config
    //   if (answers.database.toLowerCase() === 'mongodb') {
    //     mongoVar = `// Connect to MongoDB
    //       const mongodbURI = process.env.MONGODB_URI;
    //       const mongodbDB = process.env.MONGODB_DB;`;
    //     mongodbConfig = `// Connect to MongoDB
    //           mongoose.connect(\`${mongodbURI}${mongodbDB}\`, {
    //           useNewUrlParser: true,
    //           useUnifiedTopology: true,
    //           });
    //           const db = mongoose.connection;
    //           db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    //           db.once('open', () => {
    //           console.log('Connected to MongoDB');
    //           });

    //           // Define a Mongoose schema for a simple example collection
    //           const exampleSchema = new mongoose.Schema({
    //           name: String,
    //           age: Number,
    //           });

    //           // Define a Mongoose model based on the schema
    //           const Example = mongoose.model('Example', exampleSchema);`;
    //   } else if (answers.database.toLowerCase() === 'mysql') {
    //     mysqlVar = `// Create a MySQL connection
    //       const connection = mysql.createConnection({
    //         host: process.env.MYSQL_HOST,
    //         user: process.env.MYSQL_USER,
    //         password: process.env.MYSQL_PASSWORD,
    //         database: process.env.MYSQL_DATABASE,
    //       });
    //       `;
    //     mysqlConfig = `connection.connect((error) => {
    //         if (error) {
    //           console.error('Error connecting to MySQL:', error);
    //         } else {
    //           console.log('Connected to MySQL database');
    //         }
    //       });`;
    //   } else if (answers.database.toLowerCase() === 'sqlite3') {
    //     sqlite3Var = `// SQLite3 database connection
    //       const sequelize = new Sequelize({
    //         dialect: 'sqlite',
    //         storage: process.env.DB_PATH,
    //       });
    //       `;
    //     sqlite3Config = `// Define a model
    //       const User = sequelize.define('User', {
    //         name: {
    //           type: DataTypes.STRING,
    //           allowNull: false,
    //         },
    //         email: {
    //           type: DataTypes.STRING,
    //           allowNull: false,
    //           unique: true,
    //         },
    //       });`;
    //   } else if (answers.database.toLowerCase() === 'pg') {
    //     pgVar = `// Create a PostgreSQL pool
    //       const pool = new pg.Pool({
    //         user: process.env.PG_USER,
    //         host: process.env.PG_HOST,
    //         database: process.env.PG_DATABASE,
    //         password: process.env.PG_PASSWORD,
    //         port: process.env.PG_PORT,
    //       });
    //       `;
    //     pgConfig = `pool.connect((error) => {
    //         if (error) {
    //           console.error('Error connecting to PG:', error);
    //         } else {
    //           console.log('Connected to PG database');
    //         }
    //       });`;
    //   }
    else {
      return null;
    }
  }

  return `
    ${expressImportVar}
    ${koaImportVar}
    ${hapiImportVar}
    ${fastifyImportVar}
    ${mongooseVar}
    ${sequelizeVar}
    ${socketVar}
  
    ${envVar}
  
    ${mongoVar}
    ${mongodbConfig}
  
    ${mysqlVar}
    ${mysqlConfig}
  
    ${sqlite3Var}
    ${sqlite3Config}
  
    ${pgVar}
    ${pgConfig}
    
    ${socketConfig}
  
    ${expressServerVar}
    ${hapiServerVar}
    ${koaServerVar}
    ${fastifyServerVar}
      `;
};
