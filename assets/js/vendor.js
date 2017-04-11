// Vue
window.Vue = require('vue');

// Axios
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Socket.io
window.socket = require('socket.io-client')(document.location.hostname + ':1337');
