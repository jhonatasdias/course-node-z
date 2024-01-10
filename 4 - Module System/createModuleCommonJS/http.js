const request = require('./request');

// custom function http (request is for https and was personalise for http)
request.send = function () {
    console.log('custom send function')
}

request.send();