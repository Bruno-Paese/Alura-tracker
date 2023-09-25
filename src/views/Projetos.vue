<template>
	<div class="projetos">
		<h1 class="title">
			projetos
		</h1>
		<RouterView></RouterView>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ProjetosComponent'
})
</script>

<style scoped>
.projetos {
	padding: 1.5rem;
}
</style>