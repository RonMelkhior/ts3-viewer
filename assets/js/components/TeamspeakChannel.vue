<template>
    <div class="item">
        <div class="level">
            <div class="level-left">
                <span class="level-item" v-text="channel.channel.name"></span>
            </div>

            <div class="level-right">
                <span class="level-item"></span>
            </div>
        </div>

        <div class="list">
            <div class="item">
                <div class="list">
                    <div class="item" v-for="client in channel.clients">
                        <div class="level">
                            <div class="level-left">
                                <span class="level-item" v-text="client.name"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <teamspeak-channel v-for="subChannel in channel.subChannels" :channel="subChannel" :key="subChannel.name"></teamspeak-channel>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['channel'],
    }
</script>
