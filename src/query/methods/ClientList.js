const async = require('async');
const ResponseParser = require('./../utils/ResponseParser');

const ClientInfoMethod = require('./ClientInfo');

class ClientList
{
    /**
     * Execute the Client List method.
     *
     * @param {Query} query
     */
    static run(query) {
        this.query = query;

        return new Promise(this.clientList.bind(this));
    }

    /**
     * Get detailed client details about all the clients.
     *
     * @param {array} clientsRaw
     */
    static resolveClients(clientsRaw) {
        return new Promise((resolve, reject) => {
            let currentClient = 0;
            let clients = [];

            async.whilst(() => {
                return currentClient < clientsRaw.length;
            }, next => {
                let data = ResponseParser.parseLine(clientsRaw[currentClient]);

                ClientInfoMethod.run(this.query, data.clid)
                .then(client => {
                    clients.push(client);
                    currentClient++;
                    next(null, currentClient);
                })
                .catch(error => reject(error));
            }, () => {
                resolve(clients);
            });
        });
    }

    /**
     * Get client list.
     *
     * @param {callback} resolve
     * @param {callback} reject
     */
    static clientList(resolve, reject) {
        let query = ['clientlist'].join(' ');

        this.query.exec(query)
        .then(response => {
            let clientsRaw = response[0].split('|');

            this.resolveClients(clientsRaw)
            .then(clients => resolve(clients))
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    }
}

module.exports = ClientList;
