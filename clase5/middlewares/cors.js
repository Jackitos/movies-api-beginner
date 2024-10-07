const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'https://movies.com'
];

export const corsMiddleware = (req, res, acceptedOrigins = ACCEPTED_ORIGINS) => {
    const origin = req.header('origin') // get the origin header from the request
    if (acceptedOrigins.includes(origin) || !origin) { // Check if the origin is in the accepted origins or if the origin is not present
        res.header('Access-Control-Allow-Origin', origin); // Allow the request from the specified origin (CORS)
    }
}