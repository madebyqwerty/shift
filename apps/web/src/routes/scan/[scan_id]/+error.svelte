<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>{$page.status}: {$page.error?.message}</h1>
<p>Nepodařilo se nám získat data pro tento sken</p>
