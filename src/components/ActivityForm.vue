<template>
	<div class="box form">
		<div class="columns">
			<div class="column is-5" role="form" aria-label="Formulário para criação de tarefas">
				<input type="text" class="input" placeholder="Nome da tarefa" v-model="description"/>
			</div>
			<div class="column is-3">
			<div class="select">
			<select v-model="idProjeto">
				<option value="">Selecione o projeto</option>
				<option
				:value="projeto.id"
				v-for="projeto in projetos"
				:key="projeto.id"
				>
				{{ projeto.nome }}
				</option>
			</select>
			</div>
		</div>
			<div class="column">
				<ActivityTimer @end-timer="finalizarTarefa"/>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import ActivityTimer from './ActivityTimer.vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import IProjeto from '@/interfaces/IProjeto';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { notifyMixin } from '@/mixins/notify';

export default defineComponent({
	name: 'ActivityForm',
	emits: ['saveTask'],
	mixins: [notifyMixin],
	components: {
		ActivityTimer
	},

	setup(props, { emit }) {
		const store = useStore(key);
		const projetos = computed(() => store.state.projeto.projetos);

		const description = ref('');
		const idProjeto = ref('');

		const finalizarTarefa = (time: number) => {
			const projeto = projetos.value.find((proj: IProjeto) => proj.id == idProjeto.value);

			if (!projeto) {
				// notify(TipoNotificacao.FALHA, 'Erro', 'Não foi possível salvar a tarefa sem vincular a um projeto')
				return;
			}

			emit('saveTask', {
				duration: time,
				description: description.value,
				projeto: projeto
			})
			description.value = '';
		}

		return {
			description,
			idProjeto,
			projetos,
			finalizarTarefa
		}
	}
})
</script>

<style>
.form {
	background-color: var(--bg-primary);
	color: var(--text);
}
</style>