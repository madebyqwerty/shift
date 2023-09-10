<script lang="ts">
	import type { Absences } from '@shift/database-service-client';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Pencil, Trash2 } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';

	export let absence: Absences;
	export let onDelete: (absence: Absences) => void;
</script>

<Sheet.Root>
	<Table.Row>
		<Table.Cell class="font-medium">{absence.name}</Table.Cell>
		<Table.Cell>{absence.date}</Table.Cell>
		<Table.Cell>{absence.absence}</Table.Cell>
		<Table.Head class="flex justify-end items-center">
			<Sheet.Trigger asChild let:builder>
				<Button builders={[builder]} variant="secondary" size="sm" class="gap-2"
					><Pencil size={14} />Upravit</Button
				>
			</Sheet.Trigger>
			<Button
				variant="destructive"
				size="sm"
				class="gap-2 bg-red-100 text-red-950"
				on:click={() => onDelete(absence)}><Trash2 size={14} />Odstranit</Button
			>
		</Table.Head>
	</Table.Row>

	<Sheet.Content side="left">
		<Sheet.Header>
			<Sheet.Title>Upravit absenci</Sheet.Title>
			<Sheet.Description>
				Proveďte změny pro absenci studenta {absence.name} ze dne {absence.date}
			</Sheet.Description>
		</Sheet.Header>
		<div class="flex flex-col gap-4 my-4">
			<!-- <Input bind:value={absence.date} placeholder="Datum" type="date" /> -->
			<Input bind:value={absence.absence} placeholder="Hodina" type="number" />
		</div>
		<Sheet.Footer>
			<Sheet.Close asChild let:builder>
				<Button builders={[builder]} type="submit" variant="outline">Uložit</Button>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
