const Format = require('./utils/Format');
const ResponseParser = require('./utils/ResponseParser');

class Channel
{
    /**
     * Construct the channel class.
     *
     * @param {number} channelID
     * @param {string} data
     */
    constructor(channelID, data) {
        this.cid = channelID;
        this.raw = data;

        this.parse();
    }

    /**
     * Parse the raw channel info.
     */
    parse() {
        let attributes = ResponseParser.parseLine(this.raw);

        Object.keys(attributes).forEach(key => {
            this[key] = attributes[key];
        });
    }
}

module.exports = Channel;
