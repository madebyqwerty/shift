<script lang="ts">
	import type { ComponentType } from 'svelte';

	export let icon: ComponentType;
	export let color = 'bg-primary-200';
	export let size = 16;
</script>

<div class="{color} p-1 rounded-full w-max">
	<svelte:component this={icon} {size} />
</div>
