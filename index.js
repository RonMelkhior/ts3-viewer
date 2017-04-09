const Framework = require('./src/query');

let ts3 = new Framework('127.0.0.1', 10011);

ts3.on('ready', prompt => {
    console.log('connected!');
});

ts3.on('closed', () => {
    console.log('closing!');
});
