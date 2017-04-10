const Filter = require('./../../query/utils/Filter');

class ViewerBuilder
{
    /**
     * Execute the Viewer Builder method.
     */
    static run(ts3) {
        this.ts3 = ts3;

        return new Promise(this.viewerBuilder.bind(this));
    }

    /**
     * Get viewer data.
     *
     * @param {callback} resolve
     * @param {callback} reject
     */
    static async viewerBuilder(resolve, reject) {
        let channels;
        let clients;

        try {
            channels = await this.ts3.channelList();
            clients = await this.ts3.clientList({ client_type: 0 });
        } catch (error) {
            reject(error);
        }

        let result = this.getChannels(channels, clients);
        resolve(result);
    }

    /**
     * Organize all channels/clients.
     *
     * @param {array} channels
     * @param {array} clients
     * @param {number} parentChannelID
     * @returns {array}
     */
    static getChannels(channels, clients, parentChannelID = 0) {
        let result = [];
        let filteredChannels = Filter.run(channels, 'data', { pid: parentChannelID });

        filteredChannels.forEach(channel => {
            let channelClients = [];
            channel.clients(clients).forEach(client => {
                channelClients.push(client.getObject());
            });

            result.push({
                channel: channel.getObject(),
                clients: channelClients,
                subChannels: this.getChannels(channels, clients, channel.data.cid)
            });
        });

        return result;
    }
}

module.exports = ViewerBuilder;
