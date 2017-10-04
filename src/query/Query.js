const Telnet = require('telnet-client');
const { EventEmitter } = require('events');
const ResultParser = require('./utils/ResultParser');

class Query extends EventEmitter
{
    /**
     * Construct the query class.
     *
     * @param {string} host
     * @param {string} port
     */
    constructor(host, port) {
        super();

        this.socket = new Telnet();

        this.host = host;
        this.port = port;
        this.connected = false;

        this.connect();

        this.initEvents();
    }

    /**
     * Execute a command.
     *
     * @param {string} command
     */
    exec(command) {
        return new Promise((resolve, reject) => {
            this.socket.exec(command, { shellPrompt: 'error id=' })
            .then(response => {
                let output = response.split("\n").slice(0, -1);
                let result = new ResultParser(output[output.length - 1]);

                if (!result.successful) {
                    reject({
                        type: 2,
                        output,
                        result,
                    });
                }

                resolve(output);
            })
            .catch(error => {
                reject({
                    type: 1,
                    output: error
                });
            });
        });
    }

    /**
     * Add event listeners.
     */
    initEvents() {
        this.socket.on('ready', this.onReady.bind(this));
        this.socket.on('timeout', this.onTimeout.bind(this));
        this.socket.on('close', this.onClose.bind(this));
        this.socket.on('error', this.onError.bind(this));
    }

    /**
     * Connect to telnet socket.
     */
    connect() {
        const { host, port } = this;

        this.socket.connect({
            host,
            port,
            shellPrompt: 'Welcome to the TeamSpeak 3 ServerQuery interface, type "help" for a list of commands and "help <command>" for information on a specific command.',
            irs: "\n\r",
            echoLines: -1,
            timeout: 600000,
        });
    }

    /**
     * On connection.
     *
     * @param {string} prompt
     */
    onReady(prompt) {
        this.connected = true;
        this.emit('ready', prompt);
    }

    /**
     * On timeout.
     */
    onTimeout() {
        this.connected = false;
        this.emit('timeout');
    }

    /**
     * On close.
     */
    onClose() {
        this.connected = false;
        this.emit('close');
    }

    /**
     * On error.
     *
     * @param {string} error
     */
    onError(error) {
        this.connected = false;
        this.emit('error', error);
    }
}

module.exports = Query;
