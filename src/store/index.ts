import { createStore, Store, useStore as vUseStore } from "vuex";
import { InjectionKey } from 'vue';
import { NOTIFY} from './mutations';
import { INotificacao } from "@/interfaces/INotificacao";
import { EstadoProjeto, projeto } from "./modulos/projeto";
import { EstadoTarefa, task } from "./modulos/tarefa";

export interface State {
	notifications: INotificacao[],
	task: EstadoTarefa
	projeto: EstadoProjeto
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state: {
		projeto: {
			projetos: []
		},
		notifications: [],
		task: {
			tasks: []
		}
	},
	mutations: {
		[NOTIFY](state, notification: INotificacao) {
			notification.id = new Date().getTime();
			state.notifications.push(notification);

			setTimeout(() => {
				state.notifications = state.notifications.filter(notificacao => notificacao.id != notification.id)
			}, 4000);
		},
	},
	modules: {
		projeto,
		task
	}
});

export function useStore(): Store<State> {
	return vUseStore(key);
}