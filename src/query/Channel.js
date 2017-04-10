const Format = require('./utils/Format');
const ResponseParser = require('./utils/ResponseParser');

const ClientListMethod = require('./methods/ClientList');

class Channel
{
    /**
     * Construct the channel class.
     *
     * @param {Query} query
     * @param {string} data
     * @param {number} channelID
     */
    constructor(query, data, channelID) {
        this.query = query;
        this.raw = data;
        this.data = { cid: channelID };

        this.parse();
    }

    /**
     * Parse the raw channel info.
     */
    parse() {
        let attributes = ResponseParser.parseLine(this.raw);

        Object.keys(attributes).forEach(key => {
            this.data[key] = attributes[key];
        });
    }

    /**
     * Get the channel's sub-channels.
     *
     * @param {array} channelList
     * @return {array}
     */
    subChannels(channelList) {
        return Filter.run(channelList, 'data', { cid: this.data.cid });
    }

    /**
     * Get the channel's clients.
     *
     * @param {array} clientList
     * @returns {array}
     */
    clients(clientList) {
        return Filter.run(clientList, 'data', { cid: this.data.cid });
    }

    /**
     * Get the channel's name.
     */
    get name() {
        return this.data.channel_name;
    }

    /**
     * Get the channel's topic.
     */
    get topic() {
        return this.data.channel_topic;
    }

    /**
     * Get the channel's description.
     */
    get description() {
        return this.data.channel_description;
    }

    /**
     * Get the channel's needed talk power.
     */
    get neededTalkPower() {
        return this.data.needed_talk_power;
    }
}

module.exports = Channel;
