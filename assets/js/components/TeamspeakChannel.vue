<template>
    <div class="item">
        <div class="level">
            <div class="level-left">
                <span class="level-item">
                    <img src="/img/channel.svg" v-if="!channel.channel.spacer">
                </span>
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
                                <span class="level-item">
                                    <img src="/img/away.svg" v-if="client.away">
                                    <img src="/img/sound-off.svg" v-else-if="client.soundMuted || client.soundDisabled">
                                    <img src="/img/mic-off.svg" v-else-if="client.micMuted || client.micDisabled">
                                    <img src="/img/person.svg" v-else>
                                </span>
                                <span class="level-item" v-text="client.name"></span>
                            </div>

                            <div class="level-right">
                                <span class="level-item">
                                    <img src="/img/mic.svg" v-if="client.talkPower < channel.channel.neededTalkPower && client.isTalker">
                                    <img src="/img/mic-off.svg" v-else="client.talkPower < channel.channel.neededTalkPower && !client.isTalker">
                                </span>
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
