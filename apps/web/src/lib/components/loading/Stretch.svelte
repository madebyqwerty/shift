<script>
	export let color = '#FF3E00';
	export let duration = '1.2s';
	export let size = '60px';
	export let pause = false;

	let durationUnit = '';
	let durationNum = 0;

	const durationUnitRegex = /[a-zA-Z]/;

	// Vyhodí Array, kde napočítá od startu, do konce. e.g. range(1,5) => [1,2,3,4,5]
	const range = (start = 0, end) => [...Array(end).keys()].map((i) => i + start);

	$: durationUnit = duration.match(durationUnitRegex)?.[0] ?? 's';
	$: durationNum = duration.replace(durationUnitRegex, '');
</script>

<main>
	<div class="inline-block text-center" style="height:{size};width:{size}">
		{#each range(1, 5) as version}
			<div
				class=" h-full w-[10%] inline-block mr-1 scale-y-[0.4] bg-accent-200"
				class:pause-animation={pause}
				style="animation: stretch {duration} ease-in-out infinite !important;animation-delay: {(version -
					1) *
					(durationNum / 12)}{durationUnit}"
			/>
		{/each}
	</div>

	<style>
		.pause-animation {
			animation-play-state: paused;
		}
		@keyframes stretch {
			0%,
			40%,
			100% {
				transform: scaleY(0.4);
			}
			20% {
				transform: scaleY(1);
			}
		}
	</style>
</main>
