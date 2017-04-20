const _ = require('lodash');
const Format = require('./utils/Format');
const ResponseParser = require('./utils/ResponseParser');
const Filter = require('./utils/Filter');

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
     * Return the channel in object format.
     *
     * @returns {object}
     */
    getObject() {
        let properties = ['data', 'name', 'topic', 'description', 'neededTalkPower',
                          'defaultChannel', 'channelType', 'permanent', 'semiPermanent',
                          'temporary', 'spacer', 'spacerAlignment', 'spacerName'];
        let data = {};

        properties.forEach(property => {
            data[property] = this[property];
        });

        return data;
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
        let clients = Filter.run(clientList, 'data', { cid: this.data.cid });
        clients = _.orderBy(clients, ['talkPower', client => client.name.toLowerCase()], ['desc', 'asc']);

        return clients;
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
        return this.data.channel_needed_talk_power;
    }

    /**
     * Determine if the channel is the server's default channel.
     */
    get defaultChannel() {
        return this.data.channel_flag_default == 1;
    }

    /**
     * Determine channel type.
     *
     * 1: Permanent
     * 2: Semi-permanent
     * 3: Temporary
     */
    get channelType() {
        if (this.data.channel_flag_permanent == 1)
            return 1;

        if (this.data.channel_flag_semi_permanent == 1)
            return 2;

        return 3;
    }

    /**
     * Determine if the channel is permanent.
     */
    get permanent() {
        return this.channelType == 1;
    }

    /**
     * Determine if the channel is semi-permanent.
     */
    get semiPermanent() {
        return this.channelType == 2;
    }

    /**
     * Determine if the channel is temporary.
     */
    get temporary() {
        return this.channelType == 3;
    }

    /**
     * Determine if the channel is a spacer.
     */
    get spacer() {
        return this.permanent && this.data.pid == 0 && (/\[[^\]]*spacer[^\]]*\]/).test(this.name);
    }

    /**
     * Determine the spacer alignment.
     *
     * 0: Not a spacer
     * 1: Left
     * 2: Center
     * 3: Right
     * 4: Repeat
     */
    get spacerAlignment() {
        if (!this.spacer)
            return 0;

        let parse = this.name.match(/\[(.*)spacer.*\]/);

        switch (parse[1]) {
            case 'c':
                return 2;

            case 'r':
                return 3;

            case '*':
                return 4;

            default:
                return 1;
        }
    }

    /**
     * Get the spacer name after parsing.
     */
    get spacerName() {
        if (!this.spacer)
            return this.name;

        let cleanedName = this.name.replace(/.*?]/, '');
        if (this.spacerAlignment == 4)
            cleanedName = cleanedName.repeat(Math.floor(30 / cleanedName.length));

        return cleanedName;
    }
}

module.exports = Channel;
