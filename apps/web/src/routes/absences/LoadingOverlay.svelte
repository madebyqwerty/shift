<script>
	import Stretch from '$lib/components/loading/Stretch.svelte';

	export let message = 'Načítání ...';
</script>

<section
	class="absolute top-0 left-0 h-full w-full flex justify-center items-center bg-base-900 bg-opacity-50"
>
	<div class="overlay-content flex flex-col justify-center items-center">
		<Stretch size="50px" />
		<span >
			{message}
		</span>
	</div>
</section>
