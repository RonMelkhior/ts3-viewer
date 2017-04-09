const { EventEmitter } = require('events');
const Query = require('./Query');

const UseMethod = require('./methods/Use');
const LoginMethod = require('./methods/Login');
const ChannelInfoMethod = require('./methods/ChannelInfo');
const ChannelListMethod = require('./methods/ChannelList');
const ClientInfoMethod = require('./methods/ClientInfo');
const ClientListMethod = require('./methods/ClientList');

class TeamspeakFramework extends EventEmitter
{
    /**
     * Construct the framework class.
     *
     * @param {string} host
     * @param {number} port
     */
    constructor(host, port) {
        super();

        this.query = new Query(host, port);

        this.initEvents();
    }

    /**
     * Login into a query client.
     *
     * @param {string} username
     * @param {string} password
     */
    login(username, password) {
        return LoginMethod.run(this.query, username, password);
    }

    /**
     * Select which virtual server to use.
     *
     * @param {number} id
     */
    use(id) {
        return UseMethod.run(this.query, id);
    }

    /**
     * Get channel info.
     *
     * @param {number} channelID
     */
    channelInfo(channelID) {
        return ChannelInfoMethod.run(this.query, channelID);
    }

    /**
     * Get channel list.
     */
    channelList() {
        return ChannelListMethod.run(this.query);
    }

    /**
     * Get client info.
     *
     * @param {number} clientID
     */
    clientInfo(clientID) {
        return ClientInfoMethod.run(this.query, clientID);
    }

    /**
     * Get client list.
     */
    clientList() {
        return ClientListMethod.run(this.query);
    }

    /**
     * Initialize event listeners.
     */
    initEvents() {
        this.query.on('ready', this.onReady.bind(this));
        this.query.on('timeout', this.onTimeout.bind(this));
        this.query.on('close', this.onClose.bind(this));
    }

    /**
     * On ready.
     *
     * @param {string} prompt
     */
    onReady(prompt) {
        this.emit('ready', prompt);
    }

    /**
     * On timeout.
     */
    onTimeout() {
        this.emit('timeout');
    }

    /**
     * On close.
     */
    onClose() {
        this.emit('close');
    }
}

module.exports = TeamspeakFramework;
