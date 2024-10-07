import { Router } from 'express';
import { MovieController } from '../controllers/movies.js';

export const createMovieRouter = ({ movieModel }) => {
    const moviesRouter = Router();

    const movieController = new MovieController({ movieModel });

    const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'http://localhost:1234',
        'https://movies.com'
    ];

    moviesRouter.get('/', movieController.getAll);
    moviesRouter.get('/:id', movieController.getById);
    moviesRouter.post('/', movieController.create);
    moviesRouter.delete('/:id', movieController.delete);
    moviesRouter.patch('/:id', movieController.update);
    
    moviesRouter.options('/:id', (req, res) => {
        const origin = req.header('origin') // get the origin header from the request
    
        // Check if the origin is in the accepted origins or if the origin is not present
        if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
            res.header('Access-Control-Allow-Origin', origin); // Allow the request from the specified origin (CORS)
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Allow the specified methods
        }
        res.send(200); // Send an empty response
    });

    return moviesRouter;
}

// // CORS Pre-flight request --> OPTIONS request to handle the /movies path of the server --> used to describe the communication options for the target resource
// moviesRouter.options('/movies/:id', (req, res) => {
//     handleCORS(req, res);
//     res.send(); // Send an empty response
// });