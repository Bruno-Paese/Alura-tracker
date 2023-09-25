<template>
	<button class="button">
		<span class="icon">
			<i :class="icon"></i>
		</span>
		<span>{{ text }}</span>
	</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: 'TimerButton',
	props: {
		icon: {
			type: String
		},
		text: {
			type: String
		}
	}
});
</script>