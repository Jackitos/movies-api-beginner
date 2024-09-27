// argumentos de entrada
// console.log(process.argv);

// controla el proceso y su salida
// process.exit(1) // 0 es que todo salio bien, 1 es que hubo un error.

// controlar eventos del proceso
process.on('exit', () => {
  console.log('El proceso terminó');
});

// current working directory
console.log(process.cwd()); // directorio actual desde donde se ejecuta el script/proceso

//platform
console.log(process.env.PEPITO); // para que se muestre esta variable de entorno, antes de ejecutar el script se debe hacer PEPITO=valor node process-object.js