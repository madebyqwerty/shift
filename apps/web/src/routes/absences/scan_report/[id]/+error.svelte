<script lang="ts">
	import { page } from '$app/stores';
	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<PageHeader>Chyba při skenování</PageHeader>
<h1>{$page.status}: {$page.error?.message}</h1>
