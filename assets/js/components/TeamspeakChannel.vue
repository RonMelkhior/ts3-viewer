<template>
    <ul>
        <li v-text="channel.channel.name"></li>
        <ul>
            <li v-for="client in channel.clients" v-text="client.name"></li>
            <teamspeak-channel v-for="subChannel in channel.subChannels" :channel="subChannel" :key="subChannel.name"></teamspeak-channel>
        </ul>
    </ul>
</template>

<style scoped>
    ul > ul {
        padding-left: 1em;
    }
</style>

<script>
    export default {
        props: ['channel'],
    }
</script>
