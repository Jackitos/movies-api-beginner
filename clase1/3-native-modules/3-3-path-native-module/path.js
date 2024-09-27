const path = require('node:path');

//barra separadora de carpetas según SO
// console.log(path.sep);

//unir rutas con path.join()
const filePath = path.join('content', 'subfolder', 'test.txt');
// console.log(filePath);

// obtener la última parte de una ruta
const base = path.basename('/tmp/toto-files/passwords.txt');
// console.log(base);

// obtener el nombre del archivo sin la extensión
const filename = path.basename('/tmp/toto-files/passwords.txt', '.txt');
// console.log(filename);

const extension = path.extname('image.jpg');
// console.log(extension);