import { randomUUID } from 'crypto';
import { readJSON } from '../../utils.js';

const movies = readJSON('./movies.json'); // Read the movies.json file and parse it to a JSON object

export class MovieModel {
    static async getAll({ genre }) {
        if (genre) {
            return movies.filter(
                movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
        }
        return movies;
    }

    static async getById({ id }) {
        const movie = movies.find(movie => movie.id === id);
        if (movie) return movie;
        return movie;
    }

    static async create({ input }) {
        const newMovie = {
            id: randomUUID(), // Generate a random UUID
            ...input // Copy the movie object from the request body to the new movie object
        };
        movies.push(newMovie); // push the new movie object to the movies array
        return newMovie;
    }

    static async delete({ id }) {
        const movieIndex = movies.findIndex(movie => movie.id === id); // Find the index of the movie with the specified id
        if (movieIndex === -1) return false;

        movies.splice(movieIndex, 1); // Remove the movie object from the movies array
        return true;
    }

    static async update({ id, input }) {
        const movieIndex = movies.findIndex(movie => movie.id === id); // Find the index of the movie with the specified id

        if (movieIndex === -1) return false;

        movies[movieIndex] = {
            ...movies[movieIndex],
            ...input
        }

        return movies[movieIndex];
    }
}