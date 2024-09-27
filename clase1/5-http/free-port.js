const net = require('node:net');

function findAvailablePort(desiredPort){
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.listen(desiredPort, () => {
            const { port } = server.address();
            server.close(() => {
                resolve(port);
            });
        });
        server.on('error', e => {
            if(error.code === 'EADDRINUSE'){
                resolve(findAvailablePort(0).then(port => resolve(port)));
            }
            else{
                reject(e);
            }
        });
    });
}

module.exports = { findAvailablePort };