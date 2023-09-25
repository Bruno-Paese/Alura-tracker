<template>
	<div class="box has-text-wheight-bold" :style="styles">
		<slot></slot>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
	name: 'BoxComponent',
	data() {
		return {
			styles: {
				background: '#FAF0CA'
			}
		}
	}
})
</script>