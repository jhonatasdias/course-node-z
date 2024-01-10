const { send, read } = require('./indexExample')

function makeRequest2(url, data) {
    send();
    return read();
}
/* function makeRequest2(url, data) {
    indexExample.request.send();
    return indexExample.response.read();
} */

const responseData = makeRequest2('https://google.com.br', 'Hello');
console.log(responseData);