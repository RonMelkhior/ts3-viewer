const Format = require('./../utils/Format');

class ClientUpdate
{
    /**
     * Execute the Client Update method.
     *
     * @param {Query} query
     * @param {array} params
     */
    static run(query, params) {
        this.query = query;
        this.params = params;

        return new Promise(this.clientUpdate.bind(this));
    }

    /**
     * Update ServerQuery client info.
     *
     * @param {callback} resolve
     * @param {callback} reject
     */
    static clientUpdate(resolve, reject) {
        let query = ['clientupdate'];
        this.params.forEach(param => query.push(param.key + '=' + Format.encode(param.value)));
        query = query.join(' ');

        this.query.exec(query)
        .then(response => resolve(response))
        .catch(error => reject(error));
    }
}

module.exports = ClientUpdate;
