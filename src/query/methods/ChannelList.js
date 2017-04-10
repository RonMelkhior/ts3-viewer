const Filter = require('./../utils/Filter');
const Channel = require('./../Channel');

class ChannelList
{
    /**
     * Execute the Channel List method.
     *
     * @param {Query} query
     * @param {object} filters
     */
    static run(query, filters) {
        this.query = query;
        this.filters = filters;

        return new Promise(this.channelList.bind(this));
    }

    /**
     * Get channel list.
     *
     * @param {callback} resolve
     * @param {callback} reject
     */
    static channelList(resolve, reject) {
        let query = ['channellist', '-topic', '-flags', '-voice', '-limits', '-icon'].join(' ');

        this.query.exec(query)
        .then(response => {
            let channelsRaw = response[0].split('|');
            let channels = [];

            channelsRaw.forEach(data => channels.push(new Channel(this.query, data)));

            if (this.filters)
                channels = Filter.run(channels, 'data', this.filters);

            resolve(channels);
        })
        .catch(error => reject(error));
    }
}

module.exports = ChannelList;
