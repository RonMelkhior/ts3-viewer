const chalk = require('chalk');
const moment = require('moment');

class Log
{
    /**
     * Returns timestamp string.
     *
     * @returns {string}
     */
    static time() {
        let date = new moment();

        return date.format('DD-MM HH:mm:ss');
    }

    /**
     * Print a log message with a customizable color.
     *
     * @param {string} log
     * @param {string} color
     */
    static print(log, color) {
        let prefix = chalk.cyan('[' + this.time() + ']');
        let message = log;

        if (color)
            message = chalk[color](message);

        console.log(prefix + ' ' + message);
    }

    /**
     * Print a log message with a timestamp.
     *
     * @param {string} log
     */
    static info(log) {
        this.print(log);
    }

    /**
     * Print an error log message with a timestamp.
     *
     * @param {string} log
     */
    static error(log) {
        this.print(log, 'red');
    }

    /**
     * Print a success log message with a timestamp.
     *
     * @param {string} log
     */
    static success(log) {
        this.print(log, 'green');
    }
}

module.exports = Log;
