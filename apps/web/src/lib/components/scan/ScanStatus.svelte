<script lang="ts">
	import { scanStore } from '$lib/stores/scanStore';
	import ScanFinished from './ScanFinished.svelte';
	import ScanLoader from './ScanLoader.svelte';
</script>

<div class="bg-base-100 p-2 rounded-lg">
	<h3 class="font-bold text-lg">Scany</h3>
	<div class="flex flex-col gap-2">
		{#each Object.entries($scanStore) as [key, value]}
			{#if value.status === 'loading'}
				<ScanLoader name={value.name} />
			{:else}
				<ScanFinished {...value} />
			{/if}
		{/each}
	</div>
</div>
