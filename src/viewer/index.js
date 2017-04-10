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
     * @param {number} serverID
     */
    constructor(host, port, serverID) {
        super();

        this.ts3 = new Framework(host, port);
        this.serverID = serverID;

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
    }

    /**
     * On connection ready.
     *
     * @param {string} prompt
     */
    onReady(prompt) {
        this.ts3.use(this.serverID)
        .then(response => this.emit('ready', prompt))
        .catch(error => this.emit('error', error));
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
}

module.exports = Viewer;
