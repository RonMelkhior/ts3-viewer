const Format = require('./../utils/Format');

class LoginMethod
{
    /**
     * Execute the Login method.
     *
     * @param {Query} query
     * @param {string} username
     * @param {string} password
     */
    static run(query, username, password) {
        this.query = query;
        this.username = username;
        this.password = password;

        return new Promise(this.login.bind(this));
    }

    /**
     * Login into a query client.
     *
     * @param {callback} resolve
     * @param {callback} reject
     */
    static login(resolve, reject) {
        let query = ['login', Format.encode(this.username), Format.encode(this.password)].join(' ');

        this.query.exec(query)
        .then(response => resolve(response))
        .catch(error => reject(error));
    }
}

module.exports = LoginMethod;
