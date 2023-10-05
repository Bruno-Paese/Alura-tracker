<template>
	<div class="column is-three-quarter conteudo">
		<ActivityForm @saveTask="salvarTarefa" />
		<div class="lista">
			<div class="field">
				<p class="control has-icons-right">
					<input class="input" type="text" placeholder="Digite para filtrar" v-model="filter">
					<span class="icon is-small is-right">
						<i class="fas fa-search"></i>
					</span>
				</p>
			</div>
			<Task v-for="(task, i) in tarefas" :key="i" :task="task" @clicked="selectTask"></Task>
			<BoxComponent v-if="tarefas?.length == 0">
				Você não fez nada hoje :(
			</BoxComponent>
		</div>
		<Modal :mostrar="selectedTask != null" v-if="selectedTask != null">
			<template v-slot:header>
				<p class="modal-card-title">Editando Tarefa</p>
				<button class="delete" aria-label="close" @click="fecharModal"></button>
			</template>
			<template v-slot:body>
				<div class="column is-5" role="form" aria-label="Formulário para criação de tarefas">
						<input type="text" class="input" placeholder="Nome da tarefa" v-model="selectedTask.description" />
					</div>
			</template>
			<template v-slot:footer>
				<button class="button is-success" @click="alterarTarefa(selectedTask)">Salvar Alterações</button>
				<button class="button" @click="fecharModal">Cancelar</button>
			</template>
		</Modal>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import ActivityForm from '../components/ActivityForm.vue';
import Task from '../components/Task.vue';
import ITarefa from '../interfaces/ITarefa';
import BoxComponent from '../components/BoxComponent.vue';
import { useStore } from '@/store';
import { GETTASKS, INCLUDETASK, GETPROJECTS, UPDATETASK } from '@/store/actions';
import Modal from '@/components/Modal.vue';

export default defineComponent({
	name: 'App',
	components: {
		ActivityForm,
		Task,
		BoxComponent,
		Modal
	},
	data() {
		return {
			selectedTask: null as ITarefa | null
		}
	},
	methods: {
		salvarTarefa(tarefa: ITarefa): void {
			this.store.dispatch(INCLUDETASK, tarefa);
		},
		alterarTarefa(tarefa: ITarefa | null) {
			this.store.dispatch(UPDATETASK, tarefa)
				.then(() => this.fecharModal());
		},
		selectTask(tarefa: ITarefa) {
			this.selectedTask = tarefa;
		},
		fecharModal() {
			this.selectedTask = null;
		}
	},
	setup() {
		const store = useStore();

		const filter = ref('');

		watchEffect(() => {
			store.dispatch(GETTASKS, filter.value);
		})

		store.dispatch(GETTASKS);
		store.dispatch(GETPROJECTS);

		return {
			store,
			filter,
			tarefas: computed(() => store.state.task.tasks),
		}
	},
});
</script>
