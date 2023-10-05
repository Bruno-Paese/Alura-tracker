<template>
	<section>
		<form @submit.prevent="salvar">
			<div class="field">
				<label class="label" for="nomeProjeto">
					Nome do projeto
				</label>
				<input type="text" class="input" v-model="nomeProjeto" id="nomeProjeto">
			</div>
			<div class="field">
				<button class="button" type="submit">
					Salvar
				</button>
			</div>
		</form>
	</section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { ADDPROJECT, ALTERPROJECT } from './../../store/mutations';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotifier from '@/hooks/notifier';


export default defineComponent({
	name: 'FormProjetos',
	props: {
		id: {
			type: String
		}
	},
	data() {
		return {
			nomeProjeto: '',
		}
	},
	mounted() {
		if (this.id) {
			const projeto = this.store.state.projetos.find(proj => proj.id == this.id);
			this.nomeProjeto = projeto?.nome || '';
		}
	},
	methods: {
		salvar() {
			if (!this.id) {
				this.store.commit(ADDPROJECT, this.nomeProjeto);
			} else {
				this.store.commit(ALTERPROJECT, {
					id: this.id,
					nome: this.nomeProjeto
				});
			}

			this.notify(TipoNotificacao.SUCESSO, 'Novo projeto salvo', 'Salvou mesmo, pode confiar :D')

			this.nomeProjeto = '';
			this.$router.push('/projetos');
		},
	},
	setup() {
		const store = useStore();
		const { notify } = useNotifier();
		return {
			notify,
			store,
		}
	}
});
</script>
