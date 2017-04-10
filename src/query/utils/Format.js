class Format
{
    /**
     * Encode a string.
     *
     * @param {string} string
     * @returns {string}
     */
    static encode(string) {
        return String(string)
            .replace(/\\/g, '\\\\')
            .replace(/\//g, '\\/')
            .replace(/\|/g, '\\p')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t')
            .replace(/\v/g, '\\v')
            .replace(/\f/g, '\\f')
            .replace(/ /g, '\\s');
    }

    /**
     * Decode a string.
     *
     * @param {string} string
     * @returns {string}
     */
    static decode(string) {
        return String(string)
            .replace(/\\\\/g, '\\')
            .replace(/\\\//g, '/')
            .replace(/\\p/g, '|')
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r')
            .replace(/\\t/g, '\t')
            .replace(/\\v/g, '\v')
            .replace(/\\f/g, '\f')
            .replace(/\\s/g, ' ');
    }
}

module.exports = Format;
