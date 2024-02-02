const express = require('express');
const path = require('path')

const friendsRoute = require('./routes/friends.route')
const messagesRoute = require('./routes/messages.route')

const app = express();

const PORT = 3000;

app.use((req, res, next) => {
    const start = Date.now();
    next();
    // return after the conclusion response the server
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`)
})

app.use('/site', express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/friends', friendsRoute)

app.use('/messages', messagesRoute)


app.listen(PORT, () => {
    // run server => npm run watch
    console.log(`Listening on ${PORT}`);
})