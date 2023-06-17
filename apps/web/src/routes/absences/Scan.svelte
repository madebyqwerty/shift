<script lang="ts">
	import CameraInput from './CameraInput.svelte';

	let takenImage:string;
    let cameraInputRef;

    export const openCameraInput = ()=>{
        cameraInputRef.openCamera()
    }

	const handleCapture = (imgURL) => {
		takenImage = imgURL;
	};
</script>

{#if takenImage}
	<img src={takenImage} alt="Captured" class="mx-auto max-w-xs" />
{:else}
	<CameraInput on:capture={handleCapture} bind:this={cameraInputRef} />
{/if}
