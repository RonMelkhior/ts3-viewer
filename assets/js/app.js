Vue.component('teamspeak-viewer', require('./components/TeamspeakViewer.vue'));
Vue.component('teamspeak-channel', require('./components/TeamspeakChannel.vue'));

const app = new Vue({
    el: '#app',

    data: {
        channels: []
    }
});

socket.on('channels', channels => {
    app.channels = channels;
});
