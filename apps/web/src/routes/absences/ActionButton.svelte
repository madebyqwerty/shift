<script lang="ts">
	import type { ComponentType } from 'svelte';

	export let icon: ComponentType;
</script>

<button
	class="w-max rounded-xl bg-base-50 text-base-950 flex justify-center items-center gap-1 p-3 shadow"
	on:click
>
	<svelte:component this={icon} class="w-6 h-6" />
	<span class=" leading-5">
		<slot />
	</span>
</button>
