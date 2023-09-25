<template>
	<main class="columns is-gapeless is-multiline" :class="{ 'dark': dark }">
		<div class="column is-one-quarter pr-0">
			<BarraLateral @changeTheme="changeTheme"/>
		</div>
		<div class="column is-three-quarter conteudo">
			<NotificationMessage></NotificationMessage>
			<RouterView></RouterView>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import NotificationMessage from './components/NotificationMessage.vue';

export default defineComponent({
	name: 'App',
	components: {
		BarraLateral,
		NotificationMessage
	},
	data() {
		return {
			dark: false
		}
	},
	methods: {
		changeTheme(dark: boolean) {
			this.dark = dark;
		}
	}
});
</script>

<style>
.lista {
	padding: 1rem;
}
main {
	--bg-primary: white;
	--text: black
}

main.dark {
	--bg-primary: #2b2d42;
	--text: #dddddd
}

.conteudo {
	background-color: var(--bg-primary);
	color: var(--text);
}
</style>
