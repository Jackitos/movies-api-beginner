const fs = require('node:fs'); // a partir de Node 16, se recomienda usar el prefijo node: para acceder a los módulos nativos

const stats = fs.statSync('file.txt');

console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size,
);