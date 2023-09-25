<template>

		<div class="column is-three-quarter conteudo">
			<ActivityForm @saveTask="salvarTarefa"/>
			<div class="lista">
				<Task v-for="(task, i) in tarefas" :key="i" :task="task"></Task>
			</div>
			<BoxComponent v-if="tarefas.length == 0">
				Você não fez nada hoje :(
			</BoxComponent>
		</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ActivityForm from '../components/ActivityForm.vue';
import Task from '../components/Task.vue';
import ITarefa from '../interfaces/ITarefa';
import BoxComponent from '../components/BoxComponent.vue';

export default defineComponent({
    name: 'App',
    components: {
    ActivityForm,
    Task,
    BoxComponent
},
	data() {
		return {
			tarefas: [] as ITarefa[],
		}
	},
	methods: {
		salvarTarefa(tarefa: ITarefa): void {
			this.tarefas.push(tarefa);
		}
	}
});
</script>
