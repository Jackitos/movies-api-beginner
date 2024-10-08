import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '',
    database: 'moviesdb'
};

const connection = await mysql.createConnection(config);

export class MovieModel {
    static async getAll({ genre }) {
        if (genre) {
            const lowerCaseGenre = genre.toLowerCase();

            const [genres] = await connection.query(
                'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
            )

            //no genre found
            if (genres.length === 0) return [];

            // get the id from the first element of the genre result
            const [{ id }] = genres;

            // get all movies ids from database table
            // query a movie_genres
            // join
            // return results...
            return [];
        }

        const [movies] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
        )
        return movies;
    }
    static async getById({ id }) {
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
            FROM movie WHERE id = UUID_TO_BIN(?);`,
            [id]
        )
        if (movies.length === 0) return null;

        return movies[0];
    }
    static async create({ input }) {
        const {
            genre: genreInput,
            title,
            year,
            duration,
            director,
            rate,
            poster
        } = input;

        // todo --> Crear conexión de genre

        const [uuidResult] = await connection.query('SELECT UUID() uuid;');
        const [{ uuid }] = uuidResult;

        try {
            await connection.query(
                `INSERT INTO movie (id, title, year, director, duration, poster, rate)
                VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
                [title, year, director, duration, poster, rate]
            );
        }
        catch (e) {
            // puede enviarle información sensible al cliente
            throw new Error('Error creating movie');
            // enviar la traza a un servicio interno
            // ejemplo --> sendLog(e);
        }

        // console.log(result);
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
            FROM movie WHERE id = UUID_TO_BIN(?);`,
            [uuid]
        )

        return movies[0];
    }
    static async delete({ id }) {

    }
    static async update({ id, input }) {

    }
}