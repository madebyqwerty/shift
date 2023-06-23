<script lang="ts">
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import ActionButton from './ActionButton.svelte';
	import { ScanLine, PlusSquare } from 'lucide-svelte';

	let formElement: HTMLFormElement;
	let cameraInputRef: HTMLInputElement;
	let submitButton: HTMLButtonElement;

	const dispatch = createEventDispatcher();

	function handleCapture() {
		const data = new FormData(formElement);
		submitButton.click();
		dispatch('submit');
	}

	function openCamera() {
		cameraInputRef.click();
	}
</script>

<div class="flex flex-row gap-2">
	<ActionButton on:click={() => {}} icon={ScanLine}>Přidat absenci</ActionButton>
	<ActionButton on:click={openCamera} icon={PlusSquare}>Skenovat</ActionButton>

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
