// const fs = require('node:fs');

// fs.readdir('.', (err, files) => {
//     if (err) {
//         console.error(`Error en el directorio: ${err}`);
//         return;
//     }

//     files.forEach(file => {
//         console.log(file);
//     });
// });

// **************************************************

/* Método readdir() con promesas */
// const fsPromise = require('node:fs/promises');
// fsPromise.readdir('.')
//     .then(files => {
//         files.forEach(file => {
//             console.log(file);
//         });
//     })
//     .catch(err => {
//         console.error(`Error en el directorio: ${err}`);
//         return;
//     });