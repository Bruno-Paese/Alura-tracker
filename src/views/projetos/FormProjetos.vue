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
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotifier from '@/hooks/notifier';
import { INCLUDEPROJECTS, UPDATEPROJECTS } from '@/store/actions';
import { useRouter } from 'vue-router';


export default defineComponent({
	name: 'FormProjetos',
	props: {
		id: {
			type: String
		}
	},
	setup(props) {
		const router = useRouter();
		const store = useStore();
		const { notify } = useNotifier();

		const nomeProjeto = ref('');

		if (props.id) {
			const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id);
			nomeProjeto.value = projeto?.nome || '';
		}

		const successActions = () => {
			notify(TipoNotificacao.SUCESSO, 'Novo projeto salvo', 'Salvou mesmo, pode confiar :D')

			nomeProjeto.value = '';
			router.push('/projetos');
		}

		const salvar = () => {
			if (!props.id) {
				store.dispatch(INCLUDEPROJECTS, nomeProjeto.value).then(() => {
					successActions()
				});
			} else {
				store.dispatch(UPDATEPROJECTS, {
					id: props.id,
					nome: nomeProjeto.value
				}).then(() => {
					successActions()
				});
			}
		}

		return {
			nomeProjeto,
			salvar
		}
	}
});
</script>
