const fsPromise = require('node:fs/promises');
const path = require('node:path');
const pc = require('picocolors');

const folder = process.argv[2] ?? '.' // si no se pasa un argumento, se toma el directorio actual. ?? sirve para asignar un valor por defecto.

async function ls (folder){
    let files;
    try{
        files = await fsPromise.readdir(folder);
    }
    catch (error){
        console.error(pc.red(`❌ No se pudo leer el directorio: ${folder}`));
        process.exit(1);
    };

    const filesPromises = files.map(async file => {
        const filePath = path.join(folder, file);
        let stats;
        try{
            stats = await fsPromise.stat(filePath); // fs.stat es una promesa que devuelve un objeto con información del archivo.
        }
        catch(e){
            console.error(`No se pudo leer el archivo: ${filePath}`);
            process.exit(1);
        }
        const isDirectory = stats.isDirectory();
        const fileType = isDirectory ? 'd' : 'f';
        const fileSize = stats.size.toString();
        const fileModified = stats.mtime.toLocaleString(); // mtime es la fecha de modificación del archivo. toLocaleString() convierte la fecha a un string legible.
    
        return `${pc.white(fileType)} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize.padStart(10))} ${pc.yellow(fileModified)}`;
    });
    const fileInfo = await Promise.all(filesPromises);
    fileInfo.forEach(fileInfo => console.log(fileInfo));
}

ls(folder);