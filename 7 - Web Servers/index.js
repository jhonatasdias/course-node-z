const http = require('http');

const PORT = 3000;

const friends = [
    {
        id: 0,
        name: "Sir. Nikola Tesla"
    },
    {
        id: 1,
        name: "Sir. Isaac Newton"
    },
    {
        id: 2,
        name: "Sir. Albert Einstein"
    }
]

const server = http.createServer((req, res) => {
    /* res.writeHead(200, {
        'Content-Type': 'text/plain',
    })
    res.end('Hello! Sir.') */

    const items = req.url.split('/');

    console.log(items)

    if ( items[1] === 'friend') {

        if (items.length === 3) {

            const friendIndex = +items[2]; // or Number(items[2])

            console.log(friends[friendIndex])

            res.setHeader('Content-Type', 'application/json');

            res.write(JSON.stringify(friends[friendIndex]));

            res.end();

        } else {

            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(friends))

        }


    } else if ( items[1] === 'message') {

        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<li>Node.js Server');
        res.write('</html>');
        res.end();

    } else {
        res.statusCode = 404;
        res.end();
    }

})

server.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}...`);
});