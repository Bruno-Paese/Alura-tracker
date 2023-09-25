<template>
	<header>
		<h1>
			<img src="../assets/logo.png" alt="">
		</h1>
		<button class="button" @click="changeTheme">
			{{ buttonText }} modo escuro
		</button>
		<nav class="pannel mt-5">
			<ul>
				<li>
					<RouterLink to="/" class="link">
						<i class="fas fa-tasks"></i>
						Tarefas
					</RouterLink>
				</li>
				<li>
					<RouterLink to="/Projetos" class="link">
						<i class="fas fa-project-diagram"></i>
						Projetos
					</RouterLink>
				</li>
			</ul>
		</nav>
	</header>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
	name: 'lateral-bar',
	emits: ['changeTheme'],
	data() {
		return {
			dark: false
		};
	},
	computed: {
		buttonText() {
			return this.dark ? 'Desativar' : 'Ativar';
		}
	},
	methods: {
		changeTheme() {
			this.dark = !this.dark;
			this.$emit('changeTheme', this.dark);
		}
	},
	components: { RouterLink }
});
</script>
<style scoped>
header {
	padding: 1rem;
	background: #0d3b66;
	width: 100%;
	height: 100vh;
	padding: 1rem;
	text-align: center;
}

@media only screen and (max-width: 768px) {
	header {
		padding: 2.5rem;
		height: auto;
	}
}

.panel li {
	margin: 8px 0;
}

.link {
	color: #fff;
}

.link:hover {
	color: #FAF0CA;
}

.link.router-link-active {
	color: #FAF0CA;
}</style>