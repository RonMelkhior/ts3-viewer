const Filter = require('./../utils/Filter');
const Client = require('./../Client');

class ClientList
{
    /**
     * Execute the Client List method.
     *
     * @param {Query} query
     * @param {object} filters
     */
    static run(query, filters) {
        this.query = query;
        this.filters = filters;

        return new Promise(this.clientList.bind(this));
    }

    /**
     * Get client list.
     *
     * @param {callback} resolve
     * @param {callback} reject
     */
    static clientList(resolve, reject) {
        let query = ['clientlist', '-uid', '-away', '-voice', '-times', '-groups', '-info', '-icon', '-country'].join(' ');

        this.query.exec(query)
        .then(response => {
            let clientsRaw = response[0].split('|');
            let clients = [];

            clientsRaw.forEach(data => clients.push(new Client(this.query, data)));

            if (this.filters)
                clients = Filter.run(clients, 'data', this.filters);

            resolve(clients);
        })
        .catch(error => reject(error));
    }
}

module.exports = ClientList;
