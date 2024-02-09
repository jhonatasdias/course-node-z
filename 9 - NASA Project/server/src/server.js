const http = require('http')
const app = require('./app')
const mongoose = require('mongoose');

const { loadPlanetsData } = require('./models/planets.model')

const MONGO_URL = 'mongodb+srv://brufesdias:dw9wPWyJLAQh9XAo@cluster-nasa-project.zo4guy3.mongodb.net/nasa?retryWrites=true&w=majority';

const PORT = 8000 || process.env.PORT;

const server = http.createServer(app);

app.get('/', (req, res)=> {
    res.send('SERVER NODE')
})

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
})

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB error: ${err}`);
})

async function startServer() {
    await mongoose.connect(MONGO_URL);

    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
    })
}

startServer();