<script>
	export let active = false;
</script>

<button
	class="w-max rounded flex items-center justify-center px-4 py-1 {active
		? 'bg-primary-500 text-primary-950'
		: ''}"
>
	<slot />
</button>
