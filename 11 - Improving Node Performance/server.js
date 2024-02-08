const express = require('express');
const cluster = require('cluster');

const app = express();

function daley(duration) {
    const startTime = Date.now();

    while( Date.now() - startTime < duration ){
        // event loop is blocked...
    }
}

app.get('/', (req, res) => {
    res.send(`Performance example: ${process.pid}`)
})

app.get('/timer', (req, res) => {
    // delay is response
    daley(9000);

    res.send(`Ding ding ding!!! ${process.pid}`);
})

//have 3 files server.js => one master and two workers
console.log('Running server.js...')
if(cluster.isPrimary) {
    console.log("Master has been started...")
    cluster.fork();
    cluster.fork();
} else {
    console.log('Worker process started.')
    console.log(`${cluster.Worker.id}`)
    // have two workers => have to listen with port 3000
    app.listen(3000, () => {
        console.log(`server has been started...`)
    });
}
