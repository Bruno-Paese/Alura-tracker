import IProjeto from "@/interfaces/IProjeto";
import { createStore, Store, useStore as vUseStore } from "vuex";
import { InjectionKey } from 'vue';
import { ADDPROJECT, ALTERPROJECT, DELETEPROJECT, NOTIFY} from './mutations';
import { INotificacao } from "@/interfaces/INotificacao";

interface State {
	projetos: IProjeto[],
	notifications: INotificacao[]
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state: {
		projetos: [],
		notifications: []
	},
	mutations: {
		[ADDPROJECT](state, projectName: string) {
			const projeto = {
				id: new Date().toISOString(),
				nome: projectName
			} as IProjeto;

			state.projetos.push(projeto);
		},
		[ALTERPROJECT](state, projeto: IProjeto) {
			const index = state.projetos.findIndex(proj => proj.id == projeto.id);
			state.projetos[index] = projeto;
		},
		[DELETEPROJECT](state, id: string) {
			state.projetos = state.projetos.filter(proj => proj.id != id);
		},
		[NOTIFY](state, notification: INotificacao) {
			notification.id = new Date().getTime();
			state.notifications.push(notification);

			setTimeout(() => {
				state.notifications = state.notifications.filter(notificacao => notificacao.id != notification.id)
			}, 4000);
		}
	}
});

export function useStore(): Store<State> {
	return vUseStore(key);
}