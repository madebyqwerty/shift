<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import CameraInput from './CameraInput.svelte';
	import LoadingOverlay from './LoadingOverlay.svelte';

	let takenImage: string;
	let cameraInputRef;

    const dispatch = createEventDispatcher()

	export const openCameraInput = () => {
		cameraInputRef.openCamera();
	};

	const handleCapture = (event) => {
		takenImage = event.detail;
        dispatch("capture", takenImage)
	};

    let loadingText = "";
</script>

<main>
	{#if takenImage}
		<img src={takenImage} alt="Captured" class="mx-auto max-w-xs" />
	{:else}
		<CameraInput on:capture={handleCapture} bind:this={cameraInputRef} />
	{/if}
	<!-- <LoadingOverlay bind:message={loadingText}/> -->
</main>
