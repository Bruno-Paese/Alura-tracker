<template>
	<BoxComponent>
		<div class="columns">
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
	props: {
		task: {
			type: Object as PropType<ITarefa>,
			required: true
		}
	},
    components: { TimeDisplay, BoxComponent }
});
</script>

<style scoped>
.box {
	background: #faf0ca
}
</style>