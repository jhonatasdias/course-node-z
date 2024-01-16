const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
    })
    req.end('Hello! Sir.')
})

server.listen();