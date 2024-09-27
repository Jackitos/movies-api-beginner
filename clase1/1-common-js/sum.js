function sum (a, b){
    return a + b;
}

/* CommonJS Module Export */
// module.exports = sum; // Exportamos la función 'sum' para poder usarla en otros archivos
module.exports = {sum}; // exportamos un objeto con la función 'sum' para poder usarla en otros archivos