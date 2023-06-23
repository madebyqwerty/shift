<script lang="ts">
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import ActionButton from './ActionButton.svelte';

	let formElement: HTMLFormElement;
	let cameraInputRef: HTMLInputElement;
	let submitButton: HTMLButtonElement;

	const dispatch = createEventDispatcher();

	function handleCapture() {
		console.log(new FormData(formElement));
		submitButton.click();
		dispatch('submit');
	}

	function openCamera() {
		cameraInputRef.click();
	}
</script>

<div
	class="absolute top-full left-0 -translate-y-full w-full px-5 py-8 rounded-b-3xl pt-10 flex flex-row gap-2 bg-gradient-to-t from-[rgba(85,85,85,0.7)] from-60% to-[rgba(231,231,231,0]"
>
	<ActionButton on:click={() => {}} icon="plus">Přidat absenci</ActionButton>
	<ActionButton on:click={openCamera} icon="scan">Skenovat</ActionButton>

	<form use:enhance bind:this={formElement} method="post" class="hidden">
		<div class="flex flex-col items-center space-y-4">
			<input
				type="file"
				accept=".jpg, .jpeg, .png"
				name="img"
				bind:this={cameraInputRef}
				on:change={handleCapture}
			/>
		</div>
		<button bind:this={submitButton} />
	</form>
</div>
