<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let cameraInputRef;
    
	const handleCapture = () => {};

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
