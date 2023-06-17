<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let cameraInputRef;

	async function handleCapture(event) {
		const selectedFile = event.target.files[0];

		const fileReader = new FileReader();

		fileReader.onload = function () {
			const fileContents = fileReader.result;
			console.log(fileContents);
			dispatch('capture', fileContents);
			// You can perform further processing with the file contents here
		};

		fileReader.readAsDataURL(selectedFile);
	}

	// Funkce na otevření inputu, která se calluje ze Scan.svelte
	export const openCamera = () => {
		cameraInputRef.click();
	};
</script>

<div class="flex flex-col items-center space-y-4">
	<input
		type="file"
		accept="image/*;capture=camera"
		class="hidden"
		bind:this={cameraInputRef}
		on:change={handleCapture}
	/>
</div>
