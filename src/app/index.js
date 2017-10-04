const fs = require('fs');
const http = require('http');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const io = require('socket.io');
const Viewer = require('./../viewer');
const log = require('./../log');

class App
{
    /**
     * Construct the App.
     */
    constructor() {
        let loginData = {
            login: process.env.TEAMSPEAK_QUERY_LOGIN === 'true',
            loginUser: process.env.TEAMSPEAK_QUERY_USER,
            loginPass: process.env.TEAMSPEAK_QUERY_PASS,
            serverID: process.env.TEAMSPEAK_QUERY_SERVER_ID,
        };
        this.viewer = new Viewer(process.env.TEAMSPEAK_QUERY_HOST, process.env.TEAMSPEAK_QUERY_PORT, loginData);

        this.setupWeb();

        this.initEvents();
    }

    /**
     * Refresh the viewer object data.
     */
    async refreshData() {
        let viewerData;
        try {
            viewerData = await this.viewer.getViewer();
        } catch (error) {
            log.error(error);
        }

        if (!_.isEqual(viewerData, this.viewerData)) {
            this.viewerData = viewerData;
            this.io.emit('channels', this.viewerData);
        }

        setTimeout(this.refreshData.bind(this), 1000);
    }

    /**
     * Setup all Express settings.
     */
    setupWeb() {
        this.app = new express();

        this.http = http.createServer(this.app);
        this.io = io.listen(this.http);

        this.app.use(bodyParser.json());
        this.app.use(express.static('public'));
    }

    /**
     * Initialize event listeners.
     */
    initEvents() {
        this.viewer.on('ready', this.onReady.bind(this));
        this.viewer.on('connection_error', this.onConnectionError.bind(this));
        this.viewer.on('timeout', this.onTimeout.bind(this));
        this.viewer.on('close', this.onClose.bind(this));

        this.io.on('connection', this.onSocketConnection.bind(this));
    }

    /**
     * On Socket.io connection.
     *
     * @param {Socket} socket
     */
    onSocketConnection(socket) {
        this.io.to(socket.id).emit('channels', this.viewerData);
    }

    /**
     * On connection ready.
     */
    onReady() {
        log.success('Connected to the ServerQuery, getting data...');
        this.refreshData();

        this.http.listen(process.env.HTTP_SERVER_PORT);
        log.success('Started HTTP server.');
    }

    /**
     * On connection error.
     *
     * @param {object} error
     */
    onConnectionError(error) {
        log.error('An error occurred while trying to connect to the ServerQuery');
        if (error.type === 1)
            log.error('Type: 1, Error: ' + error.output.message);
        else if (error.type === 2)
            log.error('Type: 2, Code: ' + error.result.errorCode + ', Message: ' + error.result.errorMessage);
    }

    /**
     * On connection timeout.
     */
    onTimeout() {
        log.error('Connection timed-out.');
        this.viewer.ts3.query.connect();
    }

    /**
     * On connection closed.
     */
    onClose() {
        log.error('Connection closed.');
        this.viewer.ts3.query.connect();
    }

    /**
     * On connection error.
     *
     * @param {string} error
     */
    onError(errorr) {
        log.error('Connection error!');
        // No need to attempt to reconnet, since node-telnet sends a close event right after
    }
}

module.exports = App;
