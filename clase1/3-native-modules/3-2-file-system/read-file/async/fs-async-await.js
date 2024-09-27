const { readFile } = require('node:fs/promises');

// IIFE - Immediately Invoked Function Expression
(
    async () => {
        console.log('Reading file...');
        const text = await readFile('file.txt', 'utf-8'); // Common JS no sopora a await fuera de una async function. Mientras que en ES6 sí (.mjs)
        console.log('1st text: ', text);

        console.log('Doing something else...');

        console.log('Reading file2...');
        const text2 = await readFile('file2.txt', 'utf-8');
        console.log('2nd text: ', text2);
    }
)();