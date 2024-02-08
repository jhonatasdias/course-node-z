const express = require('express');

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
    daley(4000);

    res.send(`Bing bing bing!!! ${process.pid}`);
})

console.log('Worker proccess started.')
app.listen(3000, () => {
    console.log(`server has been started...`)
});