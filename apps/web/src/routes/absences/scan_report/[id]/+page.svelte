<script lang="ts">
	import { page } from '$app/stores';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PageHeader>Výsledek scanu {data.name}</PageHeader>
{#each data.data ?? [] as absence}
	<div class="flex justify-between">
		<p class="text-base-950 text-sm">{absence.lesson}. Hodina</p>
		<p class="text-base-700">{new Date(absence.date).toLocaleDateString()}</p>
	</div>
{:else}
	Na tomto skanu nebyli nalezeny žádné absence.
{/each}
