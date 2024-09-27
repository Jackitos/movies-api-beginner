const http = require('node:http');

//commonJS -> can import JSON files as if they were modules
const dittoJSON = require('./ditto.json');

const processRequest = (req, res) => {
    const { method, url } = req;

    switch(method){
        case 'GET':
            switch(url){
                case '/pokemon/ditto':
                    res.setHeader('Content-type', 'text/html; charset=utf-8');
                    return res.end(JSON.stringify(dittoJSON));
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-type', 'text/html; charset=utf-8');
                    return res.end('<h1>404: NOT FOUND</h1>');
            }

        case 'POST':
            switch(url){
                case '/pokemon': {
                    let body = '';

                    // listen data event
                    req.on('data', chunk => {
                        body += chunk.toString();
                    });

                    req.on('end', () => {
                        const data = JSON.parse(body); // parse the body to JSON
                        res.writeHead(201, {'Content-type' : 'application/json; charset=utf-8'});
                        res.end(JSON.stringify(data));
                    });
                    break;
                }
                default:
                res.statusCode = 404;
                res.setHeader('Content-type', 'text/plain; charset=utf-8');
                return res.end('404 Not Found');
            }
    }
};

const server = http.createServer(processRequest);
server.listen(1234, () => {
    console.log(`Server listening on port http://localhost:1234`);
});