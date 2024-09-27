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


// Array with specified origin (CORS) that allows the request from them. Use '*' if want to allow all origins ; Allows all origins to access the resource on the server (CORS)
// const ACCEPTED_ORIGINS = [
//     'http://localhost:8080',
//     'http://localhost:1234',
//     'https://movies.com'
// ];

// app.get('/', (req, res) => res.send('Bienvenido a la API de películas'));

app.use('/movies', moviesRouter); // Use the moviesRouter for the /movies path of the server

// // CORS Pre-flight request --> OPTIONS request to handle the /movies path of the server --> used to describe the communication options for the target resource
// app.options('/movies/:id', (req, res) => {
//     const origin = req.header('origin') // get the origin header from the request

//     // Check if the origin is in the accepted origins or if the origin is not present
//     if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//         res.header('Access-Control-Allow-Origin', origin); // Allow the request from the specified origin (CORS)
//         res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH'); // Allow the specified methods
//     }
//     res.send(); // Send an empty response
// });

const PORT = process.env.PORT ?? 1234; // Define the port where the server will listen

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});