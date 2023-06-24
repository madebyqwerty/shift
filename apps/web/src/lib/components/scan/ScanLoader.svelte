<script lang="ts">
	import BarLoader from 'svelte-loading-spinners/BarLoader.svelte';

	export let name: string;
</script>

<div class="flex items-center gap-2">
	<BarLoader color="#24a1b6" />
	{name}
</div>
