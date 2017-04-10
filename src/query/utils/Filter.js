class Filter
{
    /**
     * Run the filter operation.
     *
     * @param {array} iterable
     * @param {string} offset
     * @param {object} filters
     * @returns {array}
     */
    static run(iterable, offset, filters) {
        this.offset = offset;
        this.filters = filters;

        let filtered = iterable.filter(this.filter.bind(this));

        return filtered;
    }

    /**
     * The filter callback.
     *
     * @param {object} entry
     */
    static filter(entry) {
        let data = entry;
        if (this.offset)
            data = data[this.offset];

        for (let filter in this.filters) {
            if (data[filter] != this.filters[filter])
                return false;
        }

        return true;
    }
}

module.exports = Filter;
