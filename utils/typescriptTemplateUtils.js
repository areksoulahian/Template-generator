export const generateTsTemplate = (answers) => {
  if (answers.language.toLowerCase() === 'typescript') {
    return `
    import express, { Request, Response } from 'express';

    const app = express();
    const port = process.env.PORT || 3000;

    // Middleware
    app.use(express.json());

    // Routes
    app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express!');
    });

    // Start the server
    app.listen(port, () => {
    console.log(\`Server running on http://localhost:${port}\`);
    }); 
    `;
  }

  return null;
};
