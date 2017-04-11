const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const io = require('socket.io')(1337);
const Viewer = require('./../viewer');
const log = require('./../log');

class App
{
    /**
     * Construct the App.
     */
    constructor() {
        this.viewer = new Viewer(process.env.TEAMSPEAK_QUERY_HOST, process.env.TEAMSPEAK_QUERY_PORT, process.env.TEAMSPEAK_QUERY_SERVER_ID);

        this.setupExpress();

        this.initRoutes();
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

        if (JSON.stringify(viewerData) != JSON.stringify(this.viewerData)) {
            this.viewerData = viewerData;
            io.emit('channels', this.viewerData);
        }

        setTimeout(this.refreshData.bind(this), 1000);
    }

    /**
     * Setup all Express settings.
     */
    setupExpress() {
        this.app = new express();
        this.app.use(bodyParser.json());
        this.app.use(express.static('public'));
    }

    /**
     * Initialize web routes.
     */
    initRoutes() {

    }

    /**
     * Initialize event listeners.
     */
    initEvents() {
        this.viewer.on('ready', this.onReady.bind(this));
        this.viewer.on('timeout', this.onTimeout.bind(this));
        this.viewer.on('close', this.onClose.bind(this));

        io.on('connection', this.onSocketConnection.bind(this));
    }

    /**
     * On Socket.io connection.
     *
     * @param {Socket} socket
     */
    onSocketConnection(socket) {
        io.to(socket.id).emit('channels', this.viewerData);
    }

    /**
     * On connection ready.
     */
    onReady() {
        log.success('Connected to the ServerQuery, getting data...');
        this.refreshData();

        this.app.listen(process.env.HTTP_SERVER_PORT);
        log.success('Started HTTP server.');
    }

    /**
     * On connection timeout.
     */
    onTimeout() {

    }

    /**
     * On connection closed.
     */
    onClose() {

    }
}

module.exports = App;
