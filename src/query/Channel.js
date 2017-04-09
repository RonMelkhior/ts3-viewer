const Format = require('./utils/Format');
const ResponseParser = require('./utils/ResponseParser');

class Channel
{
    /**
     * Construct the channel class.
     *
     * @param {string} data
     */
    constructor(data) {
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
