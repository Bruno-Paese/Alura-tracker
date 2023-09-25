<template>
	<div class="notificacoes">
		<article class="message" :class="contexto[notification.tipo]" v-for="notification in notifications"
			:key="notification.id">
			<div class="message-header">
				{{ notification.titulo }}
			</div>
			<div class="message-body">
				{{ notification.texto }}
			</div>
		</article>
	</div>
</template>
<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';



export default defineComponent({
	name: 'NotificationMessage',
	data() {
		return {
			contexto: {
				[TipoNotificacao.SUCESSO]: 'is-success',
				[TipoNotificacao.ATENCAO]: 'is-warning',
				[TipoNotificacao.FALHA]: 'is-danger',
			}
		}
	},
	setup() {
		const store = useStore();

		return {
			notifications: computed(() => store.state.notifications)
		}
	}
});
</script>

<style scoped>
.notificacoes {
	position: absolute;
	right: 0;
	width: 300px;
	padding: 8px;
	z-index: 10;
}
</style>