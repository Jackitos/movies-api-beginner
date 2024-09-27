const express = require('express');
const dittoJSON = require('../1-http/ditto.json');

const PORT = process.env.PORT || 1234;

const app = express();
app.disable('x-powered-by'); // hide the server technology

app.use(express.json()); // Easier way for this middleware: function that runs before the request is processed. Adds common functionality to all routes (e.g. logging, authentication, etc.)
// app.use((req, res, next) => { // middleware: function that runs before the request is processed. Adds common functionality to all routes (e.g. logging, authentication, etc.) 
//     if(req.method !== 'POST') return next(); // call the next middleware or route handler in the stack
//     if(req.headers['content-type'] !== 'application/json') return next();

//     //just for POST requests with JSON content-type
//     let body = '';

//     // listen data event
//     req.on('data', chunk => {
//         body += chunk.toString();
//     });

//     req.on('end', () => {
//         const data = JSON.parse(body); // parse the body to JSON
//         //mutar la request y meter la información en el req.body
//         req.body = data;
//         next(); // call the next middleware or route handler in the stack
//     });
// });

app.get('/', (req, res) => {
    res.status(200).send('<h1>Mi página con Express</h1>');
});

app.get('/pokemon/ditto', (req, res) => {
    res.json(dittoJSON);
});

app.post('/pokemon', (req, res) => {
    res.status(201).json(req.body);
});

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
});

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});