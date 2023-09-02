<script lang="ts">
	import SidebarLinks from './SidebarLinks.svelte';
	import SidebarTop from './SidebarTop.svelte';
</script>

<div
	class="bg-white sticky top-0 w-full h-screen lg:!-translate-x-0 flex flex-col border-r-2 border-foreground/10"
>
	<SidebarTop />
	<SidebarLinks />
</div>
