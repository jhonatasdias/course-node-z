const http = require('http')
const app = require('./app')
const { mongoConnect } = require('../src/services/mongo');

const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchesData } = require('./models/launches.model');

const PORT = 8000 || process.env.PORT;

const server = http.createServer(app);

app.get('/', (req, res)=> {
    res.send('SERVER NODE')
})

async function startServer() {
    await mongoConnect(); 
    await loadPlanetsData();
    await loadLaunchesData();

    server.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
    })
}

startServer();