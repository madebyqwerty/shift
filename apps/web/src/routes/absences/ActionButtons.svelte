<script>
	import ActionButton from './ActionButton.svelte';
	import Scan from './Scan.svelte';

	let scanRef;
	const scan = () => {
        scanRef.openCameraInput()
    };
</script>

<div class="sticky top-full w-full py-2 flex flex-row gap-2">
	<ActionButton on:click={() => {}} icon="plus">Přidat absenci</ActionButton>
	<ActionButton on:click={scan} icon="scan">Skenovat</ActionButton>
</div>

<Scan bind:this={scanRef} on:capture />
