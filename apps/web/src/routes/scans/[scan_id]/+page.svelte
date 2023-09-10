<script lang="ts">
	import type { PageData } from './$types';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import ScanRow from '$lib/components/scans/ScanRow.svelte';
	import { Save } from 'lucide-svelte';
	import type { Absences } from '@shift/database-service-client';
	import { client } from '$lib/api/client';
	import { identity, pipe } from 'fp-ts/function';
	import * as TE from 'fp-ts/TaskEither';
	import { toError } from 'fp-ts/lib/Either';
	import toast from 'svelte-french-toast';

	export let data: PageData;

	const deleteAbsence = (absence: Absences) => {
		data.scan.absences = data.scan.absences?.filter(
			(_absence) => _absence.absenceId !== absence.absenceId
		);
	};

	console.log(data.scan.absences);

	const scanCompleteTE = TE.tryCatchK(client.scanCompleteScanIdPost.bind(client), toError);

	const saveTask = pipe(
		{
			scanId: data.scan.id ?? '',
			scanCompleteScanIdPostRequest: {
				absences: data.scan.absences?.map((absence) => ({
					...absence,
					absence: parseInt(`${absence.absence}`)
				}))
			}
		},
		scanCompleteTE,
		TE.mapBoth(
			(e) => {
				console.log(e);
				toast.error(e.message);
			},
			() => {
				toast.success('Sken byl uložen');
			}
		)
	);
</script>

<header class="flex items-center justify-between mb-16">
	<h1 class="text-5xl">Detail skenu</h1>
	<Button on:click={saveTask}><Save size={18} />Uložit</Button>
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
		{#each data.scan.absences ?? [] as absence (absence.absenceId)}
			<ScanRow {absence} onDelete={deleteAbsence} />
		{/each}
	</Table.Body>
</Table.Root>
