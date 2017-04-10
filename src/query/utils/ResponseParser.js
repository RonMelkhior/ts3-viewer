const Format = require('./Format');

class ResponseParser
{
    /**
     * Parse a line.
     *
     * @param {string} line
     * @returns {array}
     */
    static parseLine(line) {
        let attributes = line.split(' ');
        let result = [];

        attributes.forEach(attribute => {
            let seperatorIndex = attribute.indexOf('=');
            let key;
            let value;

            if (seperatorIndex === -1) {
                key = attribute;
                value = '';
            } else {
                key = attribute.substring(0, seperatorIndex);
                value = attribute.substring(seperatorIndex + 1, attribute.length);
            }

            result[key] = Format.decode(value);
        });

        return result;
    }
}

module.exports = ResponseParser;
