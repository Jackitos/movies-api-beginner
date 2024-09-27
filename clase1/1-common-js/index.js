//Common JS require module
const { sum } = require('./sum'); // Importamos la función 'sum' desde el archivo 'sum.js'
// console.log(globalThis); // 'globalThis' es una variable global en toda nuestra aplicación y apunta al objeto global
console.log(sum(1, 2));