const Format = require('./utils/Format');
const ResponseParser = require('./utils/ResponseParser');

class Client
{
    /**
     * Construct the client class.
     *
     * @param {string} data
     */
    constructor(data) {
        this.raw = data;

        this.parse();
    }

    /**
     * Parse the raw client info.
     */
    parse() {
        let attributes = ResponseParser.parseLine(this.raw);

        Object.keys(attributes).forEach(key => {
            this[key] = attributes[key];
        });
    }
}

module.exports = Client;
