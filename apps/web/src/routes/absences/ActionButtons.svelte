<script lang="ts">
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import ActionButton from './ActionButton.svelte';
	import { ScanLine, PlusSquare } from 'lucide-svelte';
	import { scanStore } from '$lib/stores/scanStore';

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

	<form
		use:enhance={({ formElement, formData, action, cancel, submitter }) => {
			const id = Math.random().toString(36).substring(7);
			scanStore.update((store) => {
				return {
					...store,
					id: {
						status: 'loading'
					}
				};
			});

			return async ({ result }) => {
				if (result.status === 400 || result.status === 500 || result.status === 404) {
					scanStore.update((store) => ({
						...store,
						[id]: {
							status: 'error',
							error:
								result.status === 404
									? 'Nastala chyba při procesování obrázku'
									: 'Nastala chyba při získání datumu'
						}
					}));
				}
			};
		}}
		bind:this={formElement}
		enctype="multipart/form-data"
		method="post"
		class="hidden"
	>
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
