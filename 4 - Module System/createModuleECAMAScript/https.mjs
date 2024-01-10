//only send is necessary, REQUEST_TIMEOUT is not used
import { send } from './request.mjs'
import { read } from './response.mjs';


function makeRequest(url, data) {
    send(url, data);
    return read();
}

const responseData = makeRequest('https://www.google.com', 'Hello')
console.log(responseData)