<script lang="ts">
	import type { Student, Absence } from '$lib/types';
	import { slide } from 'svelte/transition';
	import { ChevronRight, Check, X } from 'lucide-svelte';

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

<div class="bg-white p-1 flex flex-col h-max duration-300 transition-all rounded-lg">
	<button
		class="flex text-base-800 items-center justify-between gap-1 {open ? 'border-base-50 border-b-[2px]' : ''}"
		on:click={switchState}
	>
		<span class="flex flex-row justify-center items-center">
            <span class="duration-100 {open ? 'rotate-90' : ''}">
                <ChevronRight size={18} />
            </span>
            <p class="font-semibold text-base-950">{student.name}</p>
        </span>
        <p class="text-xs text-base-950 bg-base-200 rounded-lg px-1">36</p>

	</button>
	{#if open}
		<div
			class="accordion-content flex flex-col gap-1 pl-6 py-2"
			transition:slide={{ duration: 150 }}
		>
			<!-- {#await getAbsences()}
			<p >Loading...</p>
		{:then absences} -->

			<!-- {#each absences as absence}
					<div class="flex justify-between">
						<p class="text-base-950 text-sm">{absence.lesson}. Hodina</p>
						<p class="text-base-700">{new Date(absence.date).toLocaleDateString()}</p>
					</div>
				{/each} -->
			<div class="flex justify-between">
				<span class="flex flex-row justify-center items-center gap-1">
					<span class="icon p-0.5 bg-green-300 text-green-900 rounded-full">
						<Check size="12" strokeWidth="3" />
					</span>
					<p class="text-base-930 text-sm font-nunito-sans font-semibold text-sm">2. Hodina</p>
				</span>
				<p class="text-base-700 text-sm">17. 6. 2023</p>
			</div>
			<div class="flex justify-between">
				<span class="flex flex-row justify-center items-center gap-1">
					<span class="icon p-0.5 bg-red-300 text-red-900 rounded-full">
						<X size="12" strokeWidth="3" />
					</span>
					<p class="text-base-950 text-sm font-nunito-sans font-semibold text-sm">5. Hodina</p>
				</span>
				<p class="text-base-700 text-sm">18. 6. 2023</p>
			</div>

			<!-- {:catch error}
			<p class="text-base-800">{JSON.stringify(error.message)}</p>
		{/await} -->
		</div>
	{/if}
</div>
