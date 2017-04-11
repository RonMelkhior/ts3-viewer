<template>
    <div>
        <teamspeak-channel v-for="channel in channels" :channel="channel" :key="channel.name"></teamspeak-channel>
    </div>
</template>

<style scoped>
    ul {
        list-style-type: none;
    }
</style>

<script>
    import TeamspeakChannel from './TeamspeakChannel.vue';

    export default {
        props: ['channels'],
    }
</script>
