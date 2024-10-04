import { MovieModel } from "../models/movie.js";
import { corsMiddleware } from "../middlewares/cors.js";
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export class MovieController {
    static async getAll(req, res) {
        corsMiddleware(req, res); // Call the corsMiddleware function to handle the CORS
        const { genre } = req.query; // Destructure the genre query parameter from the request query
        const movies = await MovieModel.getAll({ genre });

        // Qué es lo que renderiza este método?
        res.json(movies); // Return all the movies
    }

    static async getById(req, res) {
        const { id } = req.params; // Destructure the id parameter from the request params
        const movie = await MovieModel.getById({ id });
        if (movie) return res.json(movie) // Return the movie if it exists
        res.status(404).json({ message: 'Movie not found' }); // Return a 404 status code if the movie does not exist
    }

    static async create(req, res) {
        const result = validateMovie(req.body); // Validate the movie object from the request body

        // If the validation fails, return a 400 status code with the error message
        if (result.error) {
            return res.status(400).json({ message: JSON.parse(result.error.message) });
        }

        // If the validation passes, create a new movie object with a random UUID and the movie object from the request body
        const newMovie = await MovieModel.create({ input: result.data });
        res.status(201).json(newMovie); // Return a 201 status code with the new movie object
    }

    static async delete(req, res) {
        corsMiddleware(req, res); // Call the corsMiddleware function to handle the CORS
        const { id } = req.params; // Destructure the id parameter from the request params

        const result = await MovieModel.delete(({ id }))
        if (result === false) return res.status(404).json({ message: "Movie Not Found" }); // Return a 404 status code if the movie does not exist

        return res.json({ message: "Movie deleted" }); // Return a JSON response with a message
    }

    static async update(req, res) {
        const result = validatePartialMovie(req.body); // Validate the partial movie object from the request body

        // If the validation fails, it return a 400 status code with the error message
        if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
        }
    
        const { id } = req.params; // Destructure the id parameter from the request params
    
        const updatedMovie = await MovieModel.update({ id, input: result.data });

        if (!updatedMovie) return res.status(404).json({ message: "Movie Not Found" }); // Return a 404 status code if the movie does not exist
    
        return res.json(updatedMovie); // return the updated movie object
    }
}