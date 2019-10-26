<template>
	<div class="channel">
		<div class="flex">
			<div class="flex flex-auto flex-no-shrink justify-start">
				<div v-if="!isSpacer" class="flex align-center justify-center w-6 h-6">
					<img svg-inline class="w-4" src="../../img/channel.svg">
				</div>
				{{ channel.channel_name }}
			</div>
		</div>

		<div v-if="orderedClients.length > 0">
			<Client v-for="client in orderedClients" :key="client.database_id" :client="client"/>
		</div>

		<div v-if="channel.sub_channels">
			<Channel
				v-for="subChannel in channel.sub_channels"
				:key="subChannel.channel_id"
				:channel="subChannel"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.channel .channel {
	@apply ml-6;
}
</style>


<script>
import Client from './Client.vue';

const spacerMatchingRegex = /\[[^\]]*spacer[^\]]*\]/;

export default {
	name: 'Channel',

	components: {
		Client,
	},

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
