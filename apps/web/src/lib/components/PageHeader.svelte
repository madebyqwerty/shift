<script lang="ts">
	import { ChevronLeft } from 'lucide-svelte';
</script>

<header class="flex gap-2 mb-4">
	<!-- svelte-ignore a11y-invalid-attribute -->
	<a href="javascript:history.back()"><ChevronLeft size="28" /></a>
	<span>
		<h1 class="text-lg font-bold font-nunito"><slot /></h1>
	</span>
</header>
