<script lang="ts">
	import type { Student, Absence } from '$lib/types';
	import { slide } from 'svelte/transition';
	import type { User } from '@shift/database-service-client';
	import { api } from '$lib/api/client';

	export let student: User;
	let open = false;

	function switchState() {
		open = !open;
	}

	async function getAbsences() {
		const data = await api.apiAbsencesUserIdGet({
			userId: student.id
		});

		return data;
	}
</script>

<div class="bg-white p-1 flex flex-col h-max duration-300 transition-all rounded-lg">
	<button
		class="flex text-base-800 items-center justify-between gap-1 {open
			? 'border-base-50 border-b-[2px]'
			: ''}"
		on:click={switchState}
	>
		<span class="flex flex-row justify-center items-center">
			<p class="duration-100 {open ? 'rotate-90' : ''}" />
			<p class="font-semibold text-base-950">{student.name}</p>
		</span>
	</button>
	{#if open}
		<div
			class="accordion-content flex flex-col gap-1 pl-6 py-2"
			transition:slide={{ duration: 150 }}
		>
			{#await getAbsences()}
				<p>Loading...</p>
			{:then absences}
				{#each absences as absence}
					<div class="flex justify-between">
						<p class="text-base-950 text-sm">{absence.lesson}. Hodina</p>
						<p class="text-base-700">{new Date(absence.date).toLocaleDateString()}</p>
					</div>
				{:else}
					Tento student nemá žádné absence
				{/each}
			{:catch error}
				<p class="text-base-800">{JSON.stringify(error)}</p>
			{/await}
		</div>
	{/if}
</div>
