<template>
	<BoxComponent>
		<div class="columns clicavel" @click="clicked">
			<div class="column is-4">
				{{ task.description || 'Tarefa sem descrição' }}
			</div>
			<div class="column is-3">
				{{ task.projeto?.nome || 'N/D' }}
			</div>
			<div class="column">
				<TimeDisplay :time="task.duration"></TimeDisplay>
			</div>
		</div>
	</BoxComponent>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ITarefa from '@/interfaces/ITarefa';
import TimeDisplay from './TimeDisplay.vue';
import BoxComponent from './BoxComponent.vue';


export default defineComponent({
	name: 'TaskComponent',
	emits: ['clicked'],
	props: {
		task: {
			type: Object as PropType<ITarefa>,
			required: true
		}
	},
	components: { TimeDisplay, BoxComponent },
	setup(props, {emit}) {
		const clicked = () => {
			emit('clicked', props.task);
		}

		return {
			clicked
		}
	}
});
</script>

<style scoped>
.box {
	background: #faf0ca
}
.clicavel:hover {
	cursor: pointer;
}
</style>