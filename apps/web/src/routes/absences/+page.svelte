<script lang="ts">
	import type { PageData } from './$types';
	import Tabs from './Tabs.svelte';
	import Tab from './Tab.svelte';
	import Student from './Student.svelte';
	import ActionButtons from './ActionButtons.svelte';

	export let data: PageData;
</script>

<section class="flex flex-col gap-2">
	<h1 class="text-2xl font-extrabold font-nunito">Absence</h1>
	<div class="w-16 h-1 bg-primary-500 rounded mb-2" />
	<Tabs>
		<Tab active>Přehled žáků</Tab>
		<Tab>Absence</Tab>
	</Tabs>
	{#each data.students as student}
		<Student {student} />
	{/each}
	<!-- 	<div class="relative">
		<ActionButtons />
	</div> -->
</section>
