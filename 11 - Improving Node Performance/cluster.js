const express = require('express');
const cluster = require('cluster');
// Configuring scheduling policy, windows dont follow the round-robin
cluster.schedulingPolicy = cluster.SCHED_RR;
const os = require('os');

const NUM_WORKERS = os.cpus().length;

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
    
    // create workers
    for(let i = 0; i < NUM_WORKERS; i++) {
        cluster.fork();
    }

} else {
    console.log(`Worker ${cluster.Worker.id} process started...`)
    // have two workers => have to listen with port 3000
    app.listen(3000, () => {
        console.log(`server has been started...`)
    });
}
