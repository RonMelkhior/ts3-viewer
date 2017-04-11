const env = require('node-env-file')(__dirname + '/.env');
const App = require('./src/app');
const log = require('./src/log');

const app = new App();

log.success('Now running');
