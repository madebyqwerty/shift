<script lang="ts">
	import ScaleOut from 'svelte-loading-spinners/ScaleOut.svelte';

	export let name: string;
</script>

<div class="flex items-center gap-2">
	<ScaleOut color="#24a1b6" size={20} />
	{name}
</div>
