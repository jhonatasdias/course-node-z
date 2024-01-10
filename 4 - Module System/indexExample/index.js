module.exports = {
    ...require('./request'),
    ...require('./response')
}

/* const request = require('./request')
const response = require('./response')

module.exports = {
    send: request.send(),
    REQUEST_TIMEOUT: response.REQUEST_TIMEOUT,
    read: response.read()
} */

/* module.exports = {
    request: require('./request'),
    response: require('./response')
} */