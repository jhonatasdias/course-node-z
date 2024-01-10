exports.REQUEST_TIMEOUT = 500;

function encrypt(data) {
    return 'encrypted data';
}

exports.send = function send(url, data) {
    const encryptedData = encrypt(data);
    console.log(`seding ${encryptedData} to ${url}`)
}

console.log('--Module reques.js--')