<script lang="ts">
	import type { Student, Absence } from '$lib/types';
	import { ChevronRight } from 'lucide-svelte';

	export let student: Student;
	let open = false;

	function switchState() {
		open = !open;
	}

	async function getAbsences() {
		console.log(student.id);
		const res = await fetch(`http://localhost:5000/api/absences/${student.id}`);

		const data = await res.json();

		if (!res.ok) throw new Error(data);

		return data as Absence[];
	}
</script>

<div class="bg-white p-2 flex flex-col h-max duration-300 transition-all">
	<button class="flex text-base-800 items-center gap-1" on:click={switchState}>
		<ChevronRight size={18} />
		<p class="font-semibold text-base-950">{student.name}</p>
	</button>
	{#if open}
		{#await getAbsences()}
			<p>Loading...</p>
		{:then absences}
			<div class="pl-6">
				{#each absences as absence}
					<div class="flex justify-between">
						<p class="text-base-950 text-sm">{absence.lesson}. Hodina</p>
						<p class="text-base-700">{new Date(absence.date).toLocaleDateString()}</p>
					</div>
				{/each}
			</div>
		{:catch error}
			<p class="text-base-800">{JSON.stringify(error.message)}</p>
		{/await}
	{/if}
</div>
