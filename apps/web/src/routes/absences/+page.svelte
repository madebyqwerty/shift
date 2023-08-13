<script lang="ts">
	import type { PageData } from './$types';
	import Tabs from './Tabs.svelte';
	import Tab from './Tab.svelte';
	import Student from './Student.svelte';
	import ActionButtons from './ActionButtons.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	export let data: PageData;
</script>

<div>
	<PageHeader>Absence</PageHeader>
	<div class="flex justify-between">
		<Tabs>
			<Tab active>Přehled žáků</Tab>
			<Tab>Absence</Tab>
		</Tabs>
		<ActionButtons />
	</div>
	<div class="content overflow-y-auto flex-grow flex flex-col gap-1 mt-4">
		{#each data.students as student}
			<Student {student} />
		{/each}
	</div>
</div>
