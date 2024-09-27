import { createRequire } from 'node:module' // createRequire is a function that allows to import modules using the CommonJS syntax
const require = createRequire(import.meta.url) // Create a require function to import the movies.json file

export const readJSON = (path) => require(path) // Import the movies.json file;