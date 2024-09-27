const http = require('node:http');
const { findAvailablePort } = require('./free-port.js');

const desiderPort = process.env.PORT ?? 3000; // this means if I execute the file with the command PORT=1234 (or any other) node https.js, the server will listen on port 1234

const server = http.createServer((req, res) => {
    console.log("Request received");
    res.end("Hello World");
});

findAvailablePort(desiderPort).then(port => {
    server.listen(port, () => {
        console.log(`Server listening on port http://localhost:${port}`);
    });
});