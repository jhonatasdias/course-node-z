const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const PORT = 3000;

app.use(express.static(path.join(__dirname, '..', 'client')));

console.log(path.join(__dirname, '..', 'client'));
console.log(path.join(__dirname, '..', 'client', 'index.html'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

server.listen(PORT);
console.log(`Listening on port ${PORT}...`);

io.on('connection', (socket) => {
  console.log('a user connected id:', socket.id);
});