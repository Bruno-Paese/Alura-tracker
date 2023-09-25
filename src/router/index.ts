import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import Tarefas from '../views/Tarefas.vue';
import Lista from '../views/projetos/ListaProjetos.vue';
import Form from '../views/projetos/FormProjetos.vue';
import Projetos from "../views/Projetos.vue";

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Tarefas',
		component: Tarefas
	},
	{
		path: '/projetos',
		component: Projetos,
		children: [
			{
				path: '',
				name: 'Projetos',
				component: Lista
			},
			{
				path: 'novo',
				name: 'Novo Projeto',
				component: Form
			},
			{
				path: ':id',
				name: 'Editar Projeto',
				component: Form,
				props: true
			},
		]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes
});

export default router;