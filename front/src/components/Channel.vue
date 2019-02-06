<template>
	<div class="channel">
		<div class="flex">
			<div class="flex flex-auto flex-no-shrink justify-start">{{ channel.channel_name }}</div>
			<!--<div class="flex justify-center">Test</div>-->
			<div class="flex flex-auto flex-no-shrink justify-end">Test</div>
		</div>

		<ul v-if="orderedClients.length > 0">
			<li v-for="client in orderedClients" :key="client.database_id">{{ client.nickname }}</li>
		</ul>

		<ul v-if="channel.sub_channels">
			<li v-for="subChannel in channel.sub_channels" :key="subChannel.channel_id">
				<Channel :channel="subChannel"/>
			</li>
		</ul>
	</div>
</template>

<script>
const spacerMatchingRegex = /\[[^\]]*spacer[^\]]*\]/;

export default {
	name: 'Channel',

	props: {
		channel: {
			required: true,
			type: Object,
		},
	},

	computed: {
		orderedClients() {
			const { clients } = this.channel;

			return clients
				? clients.slice().sort((a, b) => {
						return b.talk_power - a.talk_power || a.nickname.localeCompare(b.nickname);
				  })
				: [];
		},

		isSpacer() {
			const { channel } = this;

			return channel.permanent && channel.parent_id === 0 && spacerMatchingRegex.test(channel.channel_name);
		},
	},
};
</script>
