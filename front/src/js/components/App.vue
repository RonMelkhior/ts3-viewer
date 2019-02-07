<template>
	<div
		id="app"
		class="text-lg font-sans leading-normal mt-20 ml-auto mr-auto max-w-screen"
		v-if="viewerData"
	>
		<Channel v-for="channel in viewerData" :channel="channel" :key="channel.channel_id"/>
	</div>
</template>

<script>
import Channel from './Channel.vue';

export default {
	components: {
		Channel,
	},

	data: () => ({
		ws: null,
		viewerData: null,
	}),

	created() {
		// TODO: fix this hardcoded var.
		this.ws = new WebSocket('ws://localhost:8080/ws');
		this.ws.addEventListener('message', e => {
			this.viewerData = JSON.parse(e.data);
		});
	},

	beforeDestroy() {
		if (this.ws !== null) {
			this.ws.close();
		}
	},
};
</script>

<style>
@tailwind preflight;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css?family=Open+Sans');

#app {
	width: 600px;
}
</style>
