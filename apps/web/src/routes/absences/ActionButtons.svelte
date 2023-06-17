<script>
	import ActionButton from "./ActionButton.svelte";

    const scan = ()=>{
        
    }
</script>

<div class="sticky top-full w-full  py-2 flex flex-row gap-2">

	<ActionButton on:click={()=>{}} icon="plus">Přidat absenci</ActionButton>
	<ActionButton on:click={scan} icon="scan">Skenovat</ActionButton>

</div>
