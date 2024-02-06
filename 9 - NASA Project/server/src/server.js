const http = require('http')
const app = require('./app')

const { loadPlanetsData } = require('./models/planets.model')

const PORT = 8000 || process.env.PORT;

const server = http.createServer(app);

app.get('/', (req, res)=> {
    res.send('SERVER NODE')
})

async function startServer() {
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
    })
}

startServer();