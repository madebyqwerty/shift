<script lang="ts">
	import { ChevronLeft } from 'lucide-svelte';
	import type { PageData } from './$types';
	import Tabs from './Tabs.svelte';
	import Tab from './Tab.svelte';
	import Student from './Student.svelte';
	import ActionButtons from './ActionButtons.svelte';
	import { fly } from 'svelte/transition';

	export let data: PageData;
</script>

<div>
	<div class="flex gap-2 mb-4">
		<a href="/"><ChevronLeft size="28" /></a>
		<span>
			<h1 class="text-lg font-bold font-nunito">Absence</h1>
		</span>
	</div>
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
