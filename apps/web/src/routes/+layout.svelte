<script>
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { fly } from 'svelte/transition';
	import '../app.css';
</script>

<div
	class="w-full min-h-screen bg-base-100 text-base-950 grid grid-cols-[400px_1fr] grid-rows-1 font-nunito-sans"
>
	<div class="p-6">
		<Sidebar />
	</div>
	<main
		class="p-6"
		in:fly={{ x: 200, duration: 300, delay: 300 }}
		out:fly={{ x: 200, duration: 300 }}
	>
		<slot />
	</main>
</div>
