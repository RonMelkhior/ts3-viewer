const Format = require('./Format');

class ResponseParser
{
    /**
     * Parse a line.
     *
     * @param {string} line
     * @return {array}
     */
    static parseLine(line) {
        let attributes = line.split(' ');
        let result = [];

        attributes.forEach(attribute => {
            let equalsIndex = attribute.indexOf('=');
            let key;
            let value;

            if (equalsIndex === -1) {
                key = attribute;
                value = '';
            } else {
                key = attribute.substring(0, attribute.indexOf('='));
                value = attribute.substring(attribute.indexOf('=') + 1, attribute.length);
            }

            result[key] = Format.decode(value);
        });

        return result;
    }
}

module.exports = ResponseParser;
