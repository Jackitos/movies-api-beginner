const fs = require('node:fs/promises');

console.log('Reading file...');
fs.readFile('file.txt', 'utf-8')
    .then(text => {
        console.log('1st text: ',text);
    });

console.log('Doing something else...');

console.log('Reading file2...');
fs.readFile('file2.txt', 'utf-8')
    .then(text => {
        console.log('2nd text: ',text);
    });