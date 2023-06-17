<script lang="ts">
	import type { PageData } from './$types';
	import Tabs from './Tabs.svelte';
	import Tab from './Tab.svelte';
	import Student from './Student.svelte';
	import ActionButtons from './ActionButtons.svelte';

	export let data: PageData;
	console.log(data);

	let takenImage: string;

	const handleCapture = async (e) => {
		takenImage = e.detail;
		console.log(takenImage);

		const formData = new FormData();
		formData.append('file', takenImage);
        formData.append('week_number', '51');

		await fetch('http://localhost:5001/api/scan', {
			method: 'POST',
			body: formData
		})
			.then((response) => console.log(response))
			.then((data) => {
				// Process the response data
				console.log(data);
			})
			.catch((error) => {
				// Handle any errors
				console.error(error);
			});
	};
</script>

<section class="flex flex-col gap-2">
	<h1 class="text-2xl font-extrabold font-nunito">Absence</h1>
	<div class="w-16 h-1 bg-primary-500 rounded mb-2" />
	<Tabs>
		<Tab active>Přehled žáků</Tab>
		<Tab>Absence</Tab>
	</Tabs>
	<!-- {#each data.students as student}
		<Student {student} />
	{/each} -->
</section>
<ActionButtons on:capture={handleCapture} />
