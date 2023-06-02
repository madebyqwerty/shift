<script lang="ts">
	let selectedImage: string | null = null;

	// TODO: Fix this any
	// TODO: most likely rewrite this whole component
	async function handleFileInput(event: any) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				selectedImage = reader.result?.toString() ?? null;
			};
			reader.readAsDataURL(file);
		}
	}

	async function handleCameraInput() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			const video = document.createElement('video');
			video.srcObject = stream;
			video.autoplay = true;

			const videoContainer = document.getElementById('video-container');
			if (videoContainer) {
				videoContainer.appendChild(video);
			}

			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');

			video.onloadedmetadata = () => {
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;

				requestAnimationFrame(function captureFrame() {
					if (context) {
						context.drawImage(video, 0, 0, canvas.width, canvas.height);
					}
					selectedImage = canvas.toDataURL();

					requestAnimationFrame(captureFrame);
				});
			};
		} catch (error) {
			console.error('Chyba při přístupu kameru:', error);
		}
	}

	let checked = true;

	function handleSubmit() {
		checked = false;
	}
</script>

<input type="checkbox" id="my-modal" bind:checked class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Nahrát tabulku</h3>

		<input
			type="file"
			class="file-input file-input-bordered w-full max-w-xs"
			accept="image/*"
			on:change={handleFileInput}
		/>

		<button on:click={handleCameraInput}>Udělat fotku</button>

		<div id="video-container" />

		{#if selectedImage}
			<div>
				<h2>Vybraný obrázek</h2>
				<img src={selectedImage} class="max-w-xs max-h-xs" alt="Selected Image" />
			</div>
		{/if}

		<div class="modal-action">
			<button on:click={handleSubmit} class="btn btn-secondary">Přidat</button>
		</div>
	</div>
</div>

<style>
	img {
		max-width: 400px;
		max-height: 400px;
	}
</style>
