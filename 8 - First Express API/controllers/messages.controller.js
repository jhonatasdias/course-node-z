const path = require('path');


function getMessages(req, res) {
    // res.send('<ul><li>Hello</li></ul>') 
    res.sendFile(path.join(__dirname, '..', 'public', 'images', 'cat.png'));
}

function postMessage(req, res) {
    res.send('Updating messages...')
}

module.exports = {
    getMessages,
    postMessage
}