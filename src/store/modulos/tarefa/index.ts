import httpClient from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { State } from "@/store";
import { GETTASKS, INCLUDETASK, UPDATETASK } from "@/store/actions";
import { ADDTASK, ALTERTASK, DEFINETASKS } from "@/store/mutations";
import { Module } from "vuex";

export interface EstadoTarefa {
	tasks: ITarefa[]
}

export const task: Module<EstadoTarefa, State> = {
	mutations: {
		[DEFINETASKS](state, tasks: ITarefa[]) {
			state.tasks = tasks;
		},
		[ADDTASK](state, task: ITarefa) {
			state.tasks.push(task);
		},
		[ALTERTASK](state, tarefa: ITarefa) {
			const index = state.tasks.findIndex(proj => proj.id == tarefa.id);
			state.tasks[index] = tarefa;
		},
	},
	actions: {
		[GETTASKS]({ commit }, filtro: string) {
			let url = 'tasks';

			if (filtro) {
				url += '?description='+filtro
			}

			return httpClient.get(url)
				.then(resposta => commit(DEFINETASKS, resposta.data))
		},
		[INCLUDETASK]({ commit }, tarefa: ITarefa) {
			return httpClient.post('/tasks', tarefa)
				.then(resp => commit(ADDTASK, resp.data))
		},
		[UPDATETASK]({ commit }, tarefa: ITarefa) {
			return httpClient.put(`/tasks/${tarefa.id}`, tarefa)
				.then(resp => commit(ALTERTASK, resp.data))
		},
	}
}
