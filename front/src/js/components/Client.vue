<template>
	<div class="flex ml-6">
		<div class="flex items-center justify-center w-6 h-6">
			<img v-if="client.away" svg-inline class="display-icon away-icon" src="../../img/away.svg">
			<img
				v-else-if="client.sound_muted || !client.sound_enabled"
				svg-inline
				class="display-icon"
				src="../../img/sound-off.svg"
			>
			<img
				v-else-if="client.mic_muted || !client.mic_enabled"
				svg-inline
				class="display-icon"
				src="../../img/mic-off.svg"
			>
			<img v-else svg-inline class="display-icon" src="../../img/user.svg">
		</div>
		{{ client.nickname }}
	</div>
</template>

<style lang="scss" scoped>
.display-icon {
	@apply w-4 h-4;
}

.away-icon .secondary {
	@apply fill-current text-white;
}
</style>


<script>
export default {
	props: {
		client: {
			required: true,
			type: Object,
		},
	},
};
</script>
