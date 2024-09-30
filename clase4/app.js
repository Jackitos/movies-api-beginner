import express, { json } from 'express'; // Import the express library
import { moviesRouter } from './routes/movies.js';

/* READ JSON IN ESModules */
// import fs from 'node:fs'; // Import the fs library
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8')); // Read the movies.json file and parse it to a JSON object

/* READ JSON IN ESModules (RECOMMENDED) */
// import { createRequire } from 'node:module' // createRequire is a function that allows to import modules using the CommonJS syntax
// const require = createRequire(import.meta.url) // Create a require function to import the movies.json file
// const movies = require('./movies.json') // Import the movies.json file;

const app = express(); // Creates an express application
app.use(json()); // Middleware that parses the request body and stores it in req.body
app.disable('x-powered-by'); // Disables the x-powered-by header

app.use('/movies', moviesRouter);

const PORT = process.env.PORT ?? 1234; // Define the port where the server will listen

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});