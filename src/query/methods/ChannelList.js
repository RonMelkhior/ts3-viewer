const async = require('async');
const ResponseParser = require('./../utils/ResponseParser');

const Channel = require('./../Channel');

class ChannelList
{
    /**
     * Execute the Channel List method.
     *
     * @param {Query} query
     */
    static run(query) {
        this.query = query;

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

            channelsRaw.forEach(data => channels.push(new Channel(data)));

            resolve(channels);
        })
        .catch(error => reject(error));
    }
}

module.exports = ChannelList;
