const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
})

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB error: ${err}`);
})