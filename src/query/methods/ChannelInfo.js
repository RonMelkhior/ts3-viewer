const Channel = require('./../Channel');

class ChannelInfo
{
    /**
     * Execute the Channel Info method.
     *
     * @param {Query} query
     * @param {number} channelID
     */
    static run(query, channelID) {
        this.query = query;
        this.channelID = channelID;

        return new Promise(this.channelInfo.bind(this));
    }

    /**
     * Get channel info.
     *
     * @param {callback} resolve
     * @param {callback} reject
     */
    static channelInfo(resolve, reject) {
        let query = ['channelinfo', 'cid=' + this.channelID].join(' ');

        this.query.exec(query)
        .then(response => resolve(new Channel(this.query, response[0], this.channelID)))
        .catch(error => reject(error));
    }
}

module.exports = ChannelInfo;
