import { readFile } from 'node:fs/promises';

Promise.all([
    readFile('file.txt', 'utf-8'),
    readFile('file2.txt', 'utf-8')
]).then(([text1, text2]) => {
    console.log('1st text: ', text1);
    console.log('2nd text: ', text2);
});