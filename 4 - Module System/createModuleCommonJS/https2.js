//only send is necessary, REQUEST_TIMEOUT is not used
const request = require('./request2')
const read = require('./response')

function makeRequest(url, data) {
    request.send(url, data);
    return read();
}

const responseData = makeRequest('https://www.google.com', 'Hello')
console.log(responseData)