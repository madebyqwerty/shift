<script>
	export let active = false;
</script>

<button
	class="w-full rounded flex items-center justify-center px-0.5 py-1 {active
		? 'bg-primary-500 text-primary-950'
		: ''}"
>
	<slot />
</button>
