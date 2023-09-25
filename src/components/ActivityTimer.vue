<template>
	<div class="is-flex is-align-items-center is-justify-content-space-between">
		<TimeDisplay :time="time"></TimeDisplay>
		<TimerButton @click="iniciar" text="play" icon="fas fa-play"></TimerButton>
		<TimerButton @click="finalizar" text="stop" icon="fas fa-stop"></TimerButton>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TimeDisplay from './TimeDisplay.vue';
import TimerButton from './TimerButton.vue';

export default defineComponent({
	name: 'ActivityTimer',
	emits: ['endTimer'],
	props: {
		duration: {
			type: Number,
		}
	},
	data() {
		return {
			time: 0,
			intervalId: 0,
			active: false
		};
	},
	mounted() {
		this.time = (this.duration !== undefined ? this.duration : 0)
	},
	methods: {
		iniciar() {
			this.intervalId = setInterval(() => {
				this.time++;
			}, 1000);
			this.active = true;
		},
		finalizar() {
			clearInterval(this.intervalId);
			this.active = false;
			this.$emit('endTimer', this.time);
			this.time = 0;
		}
	},
	components: { TimeDisplay, TimerButton }
});
</script>