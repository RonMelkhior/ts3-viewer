const Format = require('./utils/Format');
const ResponseParser = require('./utils/ResponseParser');

const ChannelInfoMethod = require('./methods/ChannelInfo');

class Client
{
    /**
     * Construct the client class.
     *
     * @param {Query} query
     * @param {string} data
     * @param {number} clientID
     */
    constructor(query, data, clientID) {
        this.query = query;
        this.raw = data;
        this.data = { clid: clientID };

        this.parse();
    }

    /**
     * Parse the raw client info.
     */
    parse() {
        let attributes = ResponseParser.parseLine(this.raw);

        Object.keys(attributes).forEach(key => {
            this.data[key] = attributes[key];
        });
    }

    /**
     * Get the client's channel.
     *
     * @returns {Channel}
     */
    channel() {
        return new Promise((resolve, reject) => {
            ChannelInfoMethod.run(this.query, this.data.cid)
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
    }

    /**
     * Get the client's name.
     */
    get name() {
        return this.data.client_nickname;
    }

    /**
     * Get the client's talk power.
     */
    get talkPower() {
        return this.data.client_talk_power;
    }

    /**
     * Determine if the client is away.
     */
    get away() {
        return this.data.away == 1;
    }

    /**
     * Determine if the client's microphone is muted.
     */
    get micMuted() {
        return this.data.input_muted == 1;
    }

    /**
     * Determine if the client's microphone is disabled.
     */
    get micDisabled() {
        return this.data.input_hardware == 0;
    }

    /**
     * Determine if the client's sound is muted.
     */
    get soundMuted() {
        return this.data.output_muted == 1;
    }

    /**
     * Determine if the client's sound is disabled.
     */
    get soundDisabled() {
        return this.data.output_hardware == 0;
    }
}

module.exports = Client;
