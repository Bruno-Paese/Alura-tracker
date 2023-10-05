import httpClient from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { State } from "@/store";
import { GETPROJECTS, INCLUDEPROJECTS, UPDATEPROJECTS, REMOVEPROJECT } from "@/store/actions";
import { ADDPROJECT, ALTERPROJECT, DELETEPROJECT, DEFINEPROJECT } from "@/store/mutations";
import { Module } from "vuex";

export interface EstadoProjeto {
	projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, State> = {
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
		[DEFINEPROJECT](state, projetos: IProjeto[]) {
			state.projetos = projetos;
		},
	},
	actions: {
		[GETPROJECTS]({ commit }) {
			httpClient.get('projetos')
					.then(resposta => commit(DEFINEPROJECT, resposta.data))
		},
		[INCLUDEPROJECTS](contexto, nomeProjeto: string) {
			return httpClient.post('/projetos', {
				id: new Date().toISOString(),
				nome: nomeProjeto
			})
		},
		[UPDATEPROJECTS](contexto, projeto: IProjeto) {
			return httpClient.put(`/projetos/${projeto.id}`, projeto)
		},
		[REMOVEPROJECT]({ commit }, id: string) {
			return httpClient.delete(`/projetos/${id}`).then(() => {
				commit(DELETEPROJECT, id)
			})
		},
	}
}
