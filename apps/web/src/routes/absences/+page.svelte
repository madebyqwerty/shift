<script lang="ts">
	import LoadingOverlay from './LoadingOverlay.svelte';
	import { ChevronLeft } from 'lucide-svelte';

	import type { ActionData, PageData } from './$types';
	import Tabs from './Tabs.svelte';
	import Tab from './Tab.svelte';
	import Student from './Student.svelte';
	import ActionButtons from './ActionButtons.svelte';
	import { enhance } from '$app/forms';
	import { fly } from 'svelte/transition';

	export let data: PageData;
	console.log(data);
	export let form: ActionData;

	let takenImage: string;
	let processing: boolean = false;
	let loadingOverlay: boolean = false;

	$: loadingOverlay = processing && form == null;
	$: if (form != null) processing = false;

	function handleSubmit(e) {
		form = null;
		processing = true;
	}
</script>

<div
	class="flex flex-col gap-2 flex-grow overflow-hidden"
	in:fly={{ x: 200, duration: 300, delay: 300 }}
	out:fly={{ x: 200, duration: 300 }}
>
    <a href="/"><ChevronLeft size="28"/></a>
	<h1 class="text-2xl font-extrabold font-nunito">Absence</h1>
	<div class="w-16 h-1 bg-primary-500 rounded mb-2" />
	<Tabs>
		<Tab active>Přehled žáků</Tab>
		<Tab>Absence</Tab>
	</Tabs>
	<div class="content overflow-y-auto flex-grow flex flex-col gap-1 pb-28">
		{#each data.students.data.users as student}
			<Student {student} />
		{/each}
	</div>
</div>
<ActionButtons on:submit={handleSubmit} />
{#if loadingOverlay}
	<LoadingOverlay />
{/if}
