const http = require('node:http');
const fs = require('node:fs');

const desiderPort = process.env.PORT ?? 1234; // this means if I execute the file with the command PORT=1234 (or any other) node https.js, the server will listen on port 1234

const processRequest = (req, res) => {
    res.setHeader('Content-type', 'text/html; charset=utf-8');
    if(req.url === '/'){
        res.statusCode = 200;
        res.end("<h1>Bienvenido a mi página de inicio</h1");
    }
    else if(req.url === '/wolfi.jpeg'){
        res.setHeader('content-type', 'image/jpeg');
        fs.readFile('../assets/wolf.jpeg', (err, data) => {
            if(err){
                res.statusCode = 500;
                res.end('<h1>500: Internal Server Error</h1>');
            }
            else{
                res.statusCode = 200;
                res.setHeader('content-type', 'image/jpeg');
                res.end(data);
            }
        });
    }
    else if(req.url == '/contact'){
        res.statusCode = 200;
        res.end("<h1>Contácto</h1");
    }
    else{
        res.statusCode = 404;
        res.end("<h1>404: NOT FOUND</h1");
    }
};
const server = http.createServer(processRequest);

server.listen(desiderPort, () => {
    console.log(`Server listening on port http://localhost:${desiderPort}`);
});