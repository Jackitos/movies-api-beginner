import z from 'zod';

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Title must be a string',
        required_error: 'Title is required'
    }),
    year: z.number().int().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }),
    genre: z.array(
        z.enum(['Crime','Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Thriller', 'Western', 'Sci-Fi']),
        {
            required_error: 'Movie genre is required',
            invalid_type_error: 'Movie genre must be an array of enum Genre',
        }
    )
})

export function validateMovie(object) {
    return movieSchema.safeParse(object); // It returns an object with the shape of the schema
};

export function validatePartialMovie(object) {
    return movieSchema.partial().safeParse(object); // partial() allows to validate only the fields that are present in the object
};