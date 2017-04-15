Vue.component('teamspeak-channel', require('./components/TeamspeakChannel'));

const app = new Vue({
    el: '#app',

    data: {
        channels: []
    }
});

socket.on('channels', channels => {
    app.channels = channels;
});
