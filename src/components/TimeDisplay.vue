<template>
	<section>
		<strong>{{ formattedTime }}</strong>
	</section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
	name: 'TimeDisplay',
	props: {
		time: {
			type: Number,
			default: 0
		}
	},
	computed: {
		formattedTime() : string {
			return new Date(this.time * 1000).toISOString().substr(11, 8);
		}
	},
});
</script>

<style scoped>
strong {
	color: var(--text);
}
</style>