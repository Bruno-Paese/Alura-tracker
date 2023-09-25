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
import { computed, defineComponent } from 'vue';
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
	data() {
		return {
			description: '',
			idProjeto: ''
		}
	},
	components: {
		ActivityTimer
	},
	methods: {
		finalizarTarefa(time: number): void {
			const projeto = this.projetos.find((proj: IProjeto) => proj.id == this.idProjeto);

			if (!projeto) {
				this.notify(TipoNotificacao.FALHA, 'Erro', 'Não foi possível salvar a tarefa sem vincular a um projeto')
				return;
			}

			this.$emit('saveTask', {
				duration: time,
				description: this.description,
				projeto: projeto
			})
			this.description = '';
		}
	},
	setup() {
		const store = useStore(key);
		return {
			store,
			projetos: computed(() => store.state.projetos)
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