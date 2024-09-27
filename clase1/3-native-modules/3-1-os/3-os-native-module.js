const os = require('node:os');

console.log('Información del Sistema Operativo');
console.log('---------------------------------');

console.log('Nombre del Sistema Operativo', os.platform());
console.log('Versión del Sistema Operativo', os.version());
console.log('Arquitectura del Sistema Operativo', os.arch());
console.log('CPUs', os.cpus());
console.log('Memoria Libre', os.freemem() / 1024 / 1024); // En MB
console.log('Memoria Total', os.totalmem() / 1024 / 1024); // En MB
console.log('UpTime', os.uptime() / 60 / 60); // Te dice cuantas horas lleva encendido el sistema