const Client = require('./../Client');

class ClientInfo
{
    /**
     * Execute the Client Info method.
     *
     * @param {Query} query
     * @param {number} clientID
     */
    static run(query, clientID) {
        this.query = query;
        this.clientID = clientID;

        return new Promise(this.clientInfo.bind(this));
    }

    /**
     * Get client info.
     *
     * @param {callback} resolve
     * @param {callback} reject
     */
    static clientInfo(resolve, reject) {
        let query = ['clientinfo', 'clid=' + this.clientID].join(' ');

        this.query.exec(query)
        .then(response => resolve(new Client(this.clientID, response[0])))
        .catch(error => reject(error));
    }
}

module.exports = ClientInfo;
