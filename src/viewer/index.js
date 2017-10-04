const { EventEmitter } = require('events');
const Framework = require('./../query');

const ViewerBuilderMethod = require('./methods/ViewerBuilder');

class Viewer extends EventEmitter
{
    /**
     * Construct the viewer class.
     *
     * @param {string} host
     * @param {number} port
     * @param {object} loginData
     */
    constructor(host, port, loginData) {
        super();

        this.ts3 = new Framework(host, port);
        this.loginData = loginData;

        this.initEvents();
    }

    /**
     * Get viewer data.
     */
    getViewer() {
        return ViewerBuilderMethod.run(this.ts3);
    }

    /**
     * Initialize event listeners.
     */
    initEvents() {
        this.ts3.on('ready', this.onReady.bind(this));
        this.ts3.on('timeout', this.onTimeout.bind(this));
        this.ts3.on('close', this.onClose.bind(this));
        this.ts3.on('error', this.onError.bind(this));
    }

    /**
     * On connection ready.
     *
     * @param {string} prompt
     */
    async onReady(prompt) {
        try {
            if (this.loginData.login)
                await this.ts3.login(this.loginData.loginUser, this.loginData.loginPass);

            await this.ts3.use(this.loginData.serverID);
        } catch (error) {
            this.emit('connection_error', error);
            return;
        }

        this.emit('ready', prompt);
    }

    /**
     * On connection timeout.
     */
    onTimeout() {
        this.emit('timeout');
    }

    /**
     * On connection closed.
     */
    onClose() {
        this.emit('close');
    }

    /**
     * On connection error.
     *
     * @param {string} error
     */
    onError(error) {
        this.emit('error', error);
    }
}

module.exports = Viewer;
