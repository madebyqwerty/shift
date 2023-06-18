<script lang="ts">
	import { enhance } from '$app/forms';
	import ActionButton from './ActionButton.svelte';

	let formElement: HTMLFormElement;
	let cameraInputRef: HTMLInputElement;
	let submitButton: HTMLButtonElement;

	function handleCapture() {
		console.log(new FormData(formElement));
		submitButton.click();
	}

	function openCamera() {
		cameraInputRef.click();
	}
</script>

<div class="sticky top-full w-full py-2 flex flex-row gap-2">
	<ActionButton on:click={() => {}} icon="plus">Přidat absenci</ActionButton>
	<ActionButton on:click={openCamera} icon="scan">Skenovat</ActionButton>
</div>

<form use:enhance bind:this={formElement} method="post" enctype="multipart/form-data">
	<div class="flex flex-col items-center space-y-4">
		<input
			type="file"
			class="hidden"
			accept=".jpg, .jpeg, .png"
			name="img"
			bind:this={cameraInputRef}
			on:change={handleCapture}
		/>
	</div>
	<button bind:this={submitButton} />
</form>
