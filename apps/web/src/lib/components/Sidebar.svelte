<script lang="ts">
	import { scanStore } from '$lib/stores/scanStore';
	import ScanStatus from './scan/ScanStatus.svelte';
</script>

<div
	class="bg-base-50 top-6 sticky w-full h-[calc(100vh-48px)] lg:!-translate-x-0 shadow-md p-4 rounded-2xl flex flex-col"
>
	<h1 class="font-nunito-sans text-2xl">Shift</h1>
	<div class="flex-grow" />
	<ScanStatus />
</div>
