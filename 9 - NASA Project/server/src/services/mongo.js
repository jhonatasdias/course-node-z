const mongoose = require('mongoose');

// const MONGO_URL = process.env.MONGO_URL;

const MONGO_URL = "mongodb+srv://brufesdias:dw9wPWyJLAQh9XAo@cluster-nasa-project.zo4guy3.mongodb.net/nasa?retryWrites=true&w=majority";

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
})

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB error: ${err}`);
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}