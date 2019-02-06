<template>
	<div id="app" class="font-sans" v-if="viewerData">
		<Channel v-for="channel in viewerData" :channel="channel" :key="channel.channel_id"/>
	</div>
</template>

<script>
import Channel from './components/Channel.vue';

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
	max-width: 100vw;
	margin: 0 auto;
	margin-top: 5rem;
	/*font-family: 'Open Sans', sans-serif; */
	font-size: 17px;
}
</style>
