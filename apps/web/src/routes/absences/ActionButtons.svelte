<script lang="ts">
	import { enhance } from '$app/forms';
	import ActionButton from './ActionButton.svelte';
	import { ScanLine, PlusSquare } from 'lucide-svelte';
	import { scanStore, type ScanItem, ScanStates } from '$lib/stores/scanStore';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { addToStore } from '$lib/stores/addToStore';

	let formElement: HTMLFormElement;
	let cameraInputRef: HTMLInputElement;
	let submitButton: HTMLButtonElement;

	function handleCapture() {
		submitButton.click();
	}

	function openCamera() {
		cameraInputRef.click();
	}

	const addToScanStore = addToStore(scanStore);

	const enhanceForm: SubmitFunction = ({ formData }) => {
		const id = Math.random().toString(36).substring(7);
		const file = formData.get('img') as File;
		const name = file.name;

		const updateScanStore = addToScanStore<ScanItem>(id);

		updateScanStore({
			name,
			status: ScanStates.Loading
		});

		return async ({ result }) => {
			console.log(result);
			if (result.type === 'error') {
				updateScanStore({
					name,
					status: ScanStates.Error,
					error: 'Nastala chyba při procesování obrázku'
				});
			} else {
				updateScanStore({
					status: ScanStates.Success,
					name: name,
					data: result
				});
			}
		};
	};
</script>

<div class="flex flex-row gap-2">
	<ActionButton on:click={() => {}} icon={ScanLine}>Přidat absenci</ActionButton>
	<ActionButton on:click={openCamera} icon={PlusSquare}>Skenovat</ActionButton>

	<form
		use:enhance={enhanceForm}
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
