// javascript express server
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import fs from 'fs-extra';
  
  import sequelizer, { Sequelize, DataTypes } from 'sequelizer';
  const app = express();
const port = process.env.PORT || 3000;

// Define your routes
app.get(${answers.route}, async (req, res) => {
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

${staticRoute}
app.listen(port, () => {
console.log(`Server running on http://localhost:${port}`);
});

  
// Serve static files
app.use(express.static(__dirname));