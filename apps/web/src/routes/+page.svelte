<script>
	import { ChevronRight } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
</script>

<div
	class="grid place-items-center min-h-screen"
	in:fly={{ x: -200, duration: 300, delay: 300 }}
	out:fly={{ x: -200, duration: 300 }}
>
	<span class="text-center">
		<h1 class="text-4xl font-nunito">Shift</h1>
		<div class="w-16 h-1 bg-primary-500 rounded mb-2" />
		<p>Verze 0.0.1</p>
	</span>
	<a href="/absences"
		><span class="flex justify-center items-center text-lg">Absence <ChevronRight size={28} /></span
		></a
	>
</div>
