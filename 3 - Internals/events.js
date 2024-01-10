const EventEmitter = require('events')
const celebrity = new EventEmitter();

// Subscribe to celebrity for Observer 1
celebrity.on('race', function (result) {
    if (result === 'win') {
        console.log('Congratulation! You are the best!')
    }
});

// Subscribe to celebrity for Observer 2
celebrity.on('race win', function () {
    console.log('Boo I could have better than that!')
});

process.on('beforeExit', (code) => {
    console.log('Process beforeExit event with code:', code);
})

celebrity.emit('race', 'win');
celebrity.emit('race lost')
celebrity.emit('race win');