const fs = require('node:fs');
const { promisify } = require('node:util'); // promisify convierte una función que usa callbacks en una que devuelve una promesa

/* Forma síncrona */
// console.log('Reading file...');
// const text = fs.readFileSync('file.txt', 'utf-8');
// console.log(text); 

// console.log('Reading file2...');
// const secondText = fs.readFileSync('file2.txt', 'utf-8');
// console.log(secondText);

/* ------------------------------------------------------- */

/* Forma asícnrona (con callbacks) */
// console.log('Reading file...');
// fs.readFile('file.txt', 'utf-8', (err, text) => {
//     console.log('1st text: ',text);
// });

// console.log('Doing something else...');

// console.log('Reading file2...');
// fs.readFile('file2.txt', 'utf-8', (err, text) => {
//     console.log('2nd text: ',text);
// });

/* ------------------------------------------------------- */

/* Forma asíncrona (con promisify) */
// const readFilePromise = promisify(fs.readFile);
// console.log('Reading file...');
// fs.readFilePromise('file.txt', 'utf-8')
//     .then(text => {
//         console.log('1st text: ',text);
//     });

// console.log('--> Doing something else...');

// console.log('Reading file2...');
// fs.readFilePromise('file2.txt', 'utf-8')
//     .then(text => {
//         console.log('2nd text: ',text);
//     });