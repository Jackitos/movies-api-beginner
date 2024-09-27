const express = require('express'); // Import the express library
const crypto = require('node:crypto'); // Import the crypto library --> used to generate random UUIDs
const movies = require('./movies.json'); // Import the movies array from the movies.json file --> used to store the movies

const { validateMovie, validatePartialMovie } = require('./schemas/movies'); // Importing functions to validate the movie object and the partial movie object

const app = express(); // Creates an express application
app.use(express.json()); // Middleware that parses the request body and stores it in req.body
app.disable('x-powered-by'); // Disables the x-powered-by header

// Array with specified origin (CORS) that allows the request from them. Use '*' if want to allow all origins ; Allows all origins to access the resource on the server (CORS)
const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'https://movies.com'
]

// GET request to handle the root path of the server
app.get('/', (req, res) => {
    res.json({ message: 'hola mundo' }); // Return a JSON response with a message
});

// GET request to the /movies path of the server ; Todos los recursos que sean movies se identifican con /movies
app.get('/movies', (req, res) => {
    const origin = req.header('origin') // get the origin header from the request
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) { // Check if the origin is in the accepted origins or if the origin is not present
        res.header('Access-Control-Allow-Origin', origin); // Allow the request from the specified origin (CORS)
    }

    const { genre } = req.query; // Destructure the genre query parameter from the request query
    if (genre) {
        const filteredMovies = movies.filter( // Filter the movies array based on the genre query parameter
            // movie => movie.genre.includes(genre)
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()) // Return true if at least one element in the array passes the test
        )
        return res.json(filteredMovies); // Return the filtered movies
    }
    res.json(movies); // Return all the movies
});

// GET request to handle the /movies/:id path of the server
app.get('/movies/:id', (req, res) => {
    const { id } = req.params; // Destructure the id parameter from the request params
    const movie = movies.find(movie => movie.id === id); // Find the movie with the specified id
    if (movie) return res.json(movie) // Return the movie if it exists

    res.status(404).json({ message: 'Movie not found' }); // Return a 404 status code if the movie does not exist
});

// POST request to handle the /movies path of the server
app.post('/movies', (req, res) => {
    const result = validateMovie(req.body); // Validate the movie object from the request body

    // If the validation fails, return a 400 status code with the error message
    if (result.error) {
        return res.status(400).json({ message: JSON.parse(result.error.message) });
    }

    // If the validation passes, create a new movie object with a random UUID and the movie object from the request body
    const newMovie = {
        id: crypto.randomUUID(), // Generate a random UUID
        ...result.data // Copy the movie object from the request body to the new movie object
    };
    movies.push(newMovie); // push the new movie object to the movies array
    res.status(201).json(newMovie); // Return a 201 status code with the new movie object
});

// PATCH request to handle the /movies/:id path of the server
app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body); // Validate the partial movie object from the request body

    // If the validation fails, it return a 400 status code with the error message
    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params; // Destructure the id parameter from the request params
    const movieIndex = movies.findIndex(movie => movie.id === id); // Find the index of the movie with the specified id

    if (movieIndex === -1) return res.status(404).json({ message: "404 Not Found" }); // Return a 404 status code if the movie does not exist

    // Update the movie object with the fields from the partial movie object
    const updateMovie = {
        ...movies[movieIndex], // Copy the movie object
        ...result.data // Copy the fields that are present in the result object
    }

    movies[movieIndex] = updateMovie; // update the movie object in the movies array

    return res.json(updateMovie); // return the updated movie object
});

// DELETE request to handle the /movies/:id path of the server
app.delete('/movies/:id', (req, res) => {
    const origin = req.header('origin') // get the origin header from the request

    // Check if the origin is in the accepted origins or if the origin is not present
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin); // Allow the request from the specified origin (CORS)
    }

    const id = req.params; // Destructure the id parameter from the request params
    const movieIndex = movies.findIndex(movie => movie.id === id); // Find the index of the movie with the specified id

    if (movieIndex === -1) return res.status(404).json({ message: "404 Not Found" }); // Return a 404 status code if the movie does not exist

    movies.splice(movieIndex, 1); // Remove the movie object from the movies array
    return res.json({ message: "Movie deleted" }); // Return a JSON response with a message
});

// OPTIONS request to handle the /movies path of the server --> used to describe the communication options for the target resource
app.options('/movies/:id', (req, res) => {
    const origin = req.header('origin') // get the origin header from the request

    // Check if the origin is in the accepted origins or if the origin is not present
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin); // Allow the request from the specified origin (CORS)
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH'); // Allow the specified methods
    }
    res.send(); // Send an empty response
})

const PORT = process.env.PORT ?? 1234 // Define the port where the server will listen

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});