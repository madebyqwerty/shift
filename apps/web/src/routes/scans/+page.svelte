<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	export let data: PageData;
</script>

<header>
	<h1 class="text-4xl">Skeny</h1>
</header>
<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Header>ID</Table.Header>
			<Table.Header />
		</Table.Row>
	</Table.Header>
	{#each data.scans as scan}
		<Table.Row>
			<Table.Cell>{scan.id}</Table.Cell>
			<Table.Cell><Button variant="link" href="/scans/{scan.id}">Zobrazit</Button></Table.Cell>
		</Table.Row>
	{/each}
</Table.Root>
