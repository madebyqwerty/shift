<script lang="ts">
	import { scanStore } from '$lib/stores/scanStore';
</script>

<div
	class="bg-base-50 top-6 sticky w-full h-[calc(100vh-48px)] lg:!-translate-x-0 shadow-md p-4 rounded-2xl"
>
	<h1 class="font-nunito-sans text-2xl">Shift</h1>
	{#each Object.entries($scanStore) as [key, value]}
		<p>{key}: {JSON.stringify(value)}</p>
	{/each}
</div>
