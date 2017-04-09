const Format = require('./Format');

class ResultParser
{
    /**
     * Construct the parser.
     *
     * @param {string} result
     */
    constructor(result) {
        this.result = result;

        this.parse();
    }

    /**
     * Parse the result.
     */
    parse() {
        let sections = this.result.split(' ');
        sections.shift(); // remove the 'error' section, completely useless.

        this.errorCode = parseInt(sections[0].split('=')[1]);
        this.errorMessage = Format.decode(sections[1].split('=')[1]);
    }

    get successful() {
        return this.errorCode == 0;
    }
}

module.exports = ResultParser;
