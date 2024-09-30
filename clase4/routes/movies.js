import { Router } from 'express';
import { randomUUID } from 'node:crypto'; // Import the crypto library --> used to generate random UUIDs
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'; // Importing functions to validate the movie object and the partial movie object
import { readJSON } from '../utils.js';
import { corsMiddleware } from '../middlewares/cors.js';

const movies = readJSON('./movies.json'); // Read the movies.json file and parse it to a JSON object

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'https://movies.com'
];

export const moviesRouter = Router();

moviesRouter.get('/', (req, res) => {
    corsMiddleware(req, res); // Call the corsMiddleware function to handle the CORS
    const { genre } = req.query; // Destructure the genre query parameter from the request query
    if (genre) {
        const filteredMovies = movies.filter( // Filter the movies array based on the genre query parameter
            // movie => movie.genre.includes(genre)
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()) // Return true if at least one element in the array passes the test.
        )
        return res.json(filteredMovies); // Return the filtered movies
    }
    res.json(movies); // Return all the movies
});

moviesRouter.get('/:id', (req, res) => {
    const { id } = req.params; // Destructure the id parameter from the request params
    const movie = movies.find(movie => movie.id === id); // Find the movie with the specified id
    if (movie) return res.json(movie) // Return the movie if it exists
    res.status(404).json({ message: 'Movie not found' }); // Return a 404 status code if the movie does not exist
});

moviesRouter.post('/', (req, res) => {
    const result = validateMovie(req.body); // Validate the movie object from the request body

    // If the validation fails, return a 400 status code with the error message
    if (result.error) {
        return res.status(400).json({ message: JSON.parse(result.error.message) });
    }

    // If the validation passes, create a new movie object with a random UUID and the movie object from the request body
    const newMovie = {
        id: randomUUID(), // Generate a random UUID
        ...result.data // Copy the movie object from the request body to the new movie object
    };
    movies.push(newMovie); // push the new movie object to the movies array
    res.status(201).json(newMovie); // Return a 201 status code with the new movie object
});

moviesRouter.patch('/:id', (req, res) => {
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

moviesRouter.delete('/:id', (req, res) => {
    corsMiddleware(req, res); // Call the corsMiddleware function to handle the CORS
    const { id } = req.params; // Destructure the id parameter from the request params
    const movieIndex = movies.findIndex(movie => movie.id === id); // Find the index of the movie with the specified id

    if (movieIndex === -1) return res.status(404).json({ message: "404 Not Found" }); // Return a 404 status code if the movie does not exist

    movies.splice(movieIndex, 1); // Remove the movie object from the movies array
    return res.json({ message: "Movie deleted" }); // Return a JSON response with a message
});

moviesRouter.options('/:id', (req, res) => {
    const origin = req.header('origin') // get the origin header from the request

    // Check if the origin is in the accepted origins or if the origin is not present
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin); // Allow the request from the specified origin (CORS)
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Allow the specified methods
    }
    res.send(200); // Send an empty response
});

// // CORS Pre-flight request --> OPTIONS request to handle the /movies path of the server --> used to describe the communication options for the target resource
// moviesRouter.options('/movies/:id', (req, res) => {
//     handleCORS(req, res);
//     res.send(); // Send an empty response
// });