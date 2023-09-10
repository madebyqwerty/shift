<script lang="ts">
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import { fly } from 'svelte/transition';
	import '../app.css';
	import toast, { Toaster } from 'svelte-french-toast';
	import Scans from '$lib/components/scans/Scans.svelte';
	import { browser } from '$app/environment';
	import { Focus } from 'lucide-svelte';
	import { api } from '$lib/api/client';

	async function handleImageInput(event: InputEvent) {
		const file = event.target.files[0];
		// const reader = new FileReader();
		// reader.onload = (e) => {
		// 	const blob = new Blob([e.target.result], { type: file.type });
		// 	api.scanPostRaw({ img: blob, weekNumber: 4 }).then((res)=>{
		//     console.log(res)
		//   }).catch((err)=>{
		//     console.log(err)
		//   });
		// };
		// reader.readAsArrayBuffer(file);

		const formData = new FormData();
		formData.append('img', event.target.files[0]);
		formData.append('week_number', '4');
		await fetch('http://localhost:5003/scan', {
			method: 'POST',
			body: formData
		}).then((res) => {
			console.log(res);
		});
	}
</script>

<div class="w-screen h-screen flex sm:hidden flex-col justify-center items-center">
	<label for="img" class="cursor-pointer select-none p-[3vw] rounded-[4vw] bg-green-200">
		<input
			type="file"
			name="img"
			id="img"
			on:input={handleImageInput}
			accept="image/*"
			class="hidden"
			capture
		/>
		<Focus class="w-[25vw] h-[25vw] text-green-800" /></label
	>
</div>

<div
	class="w-full min-h-screen bg-background text-base-950 hidden grid-cols-[255px_1fr] grid-rows-1 font-nunito-sans sm:grid"
>
	<Toaster />
	<Sidebar />
	<main
		class="p-6"
		in:fly={{ x: 200, duration: 300, delay: 300 }}
		out:fly={{ x: 200, duration: 300 }}
	>
		<slot />
	</main>
	{#if browser}
		<Scans />
	{/if}
</div>
