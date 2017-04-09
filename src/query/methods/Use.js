class UseMethod
{
    /**
     * Execute the Use method.
     *
     * @param {Query} query
     * @param {number} id
     */
    static run(query, id) {
        this.query = query;
        this.id = id;

        return new Promise(this.use.bind(this));
    }

    /**
     * Use a virtual server.
     *
     * @param {callback} resolve
     * @param {callback} reject
     */
    static use(resolve, reject) {
        let query = ['use', this.id].join(' ');

        this.query.exec(query)
        .then(response => resolve(response))
        .catch(error => reject(error));
    }
}

module.exports = UseMethod;
