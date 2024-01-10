//only send is necessary, REQUEST_TIMEOUT is not used
const { send } = require('./request2')
const read = require('./response')
const { REQUEST_TIMEOUT } = require('./request2')

function makeRequest(url, data) {
    send(url, data);
    return read();
}
console.log('--1 Module https.js--')
const responseData = makeRequest('https://www.google.com', 'Hello')
console.log(responseData)
console.log('--2 Module https.js--')