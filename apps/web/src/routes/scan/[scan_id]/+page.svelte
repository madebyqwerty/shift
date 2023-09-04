<script lang="ts">
	import { page } from '$app/stores';
	import { client } from '$lib/api/client';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<h1>Scan {data.scan}</h1>
</main>
