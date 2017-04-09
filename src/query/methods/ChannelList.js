const async = require('async');
const ResponseParser = require('./../utils/ResponseParser');

const ChannelInfoMethod = require('./ChannelInfo');

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
     * Get detailed channel details about all the channels.
     *
     * @param {array} channelsRaw
     */
    static resolveChannels(channelsRaw) {
        return new Promise((resolve, reject) => {
            let currentChannel = 0;
            let channels = [];

            async.whilst(() => {
                return currentChannel < channelsRaw.length;
            }, next => {
                let data = ResponseParser.parseLine(channelsRaw[currentChannel]);

                ChannelInfoMethod.run(this.query, data.cid)
                .then(channel => {
                    channels.push(channel);
                    currentChannel++;
                    next(null, currentChannel);
                })
                .catch(error => reject(error));
            }, () => {
                resolve(channels);
            });
        });
    }

    /**
     * Get channel list.
     *
     * @param {callback} resolve
     * @param {callback} reject
     */
    static channelList(resolve, reject) {
        let query = ['channellist'].join(' ');

        this.query.exec(query)
        .then(response => {
            let channelsRaw = response[0].split('|');

            this.resolveChannels(channelsRaw)
            .then(channels => resolve(channels))
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    }
}

module.exports = ChannelList;
