<script lang="ts">
	import type { PageData } from './$types';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import ScanRow from '$lib/components/scans/ScanRow.svelte';
	import { Save } from 'lucide-svelte';
	import type { Absences } from '@shift/database-service-client';

	export let data: PageData;

	const deleteAbsence = (absence: Absences) => {
		data.scan.absences = data.scan.absences?.filter((_absence) => _absence.id !== absence.id);
	};
</script>

<header class="flex items-center justify-between mb-16">
	<h1 class="text-5xl">Detail skenu</h1>
	<Button><Save size={18} />Uložit</Button>
</header>
<Table.Root>
	<Table.Caption>Sken: {data.scan.id}</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head>Student</Table.Head>
			<Table.Head>Datum</Table.Head>
			<Table.Head>Hodina</Table.Head>
			<Table.Head />
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.scan.absences ?? [] as absence}
			<ScanRow {absence} onDelete={deleteAbsence} />
		{/each}
	</Table.Body>
</Table.Root>
