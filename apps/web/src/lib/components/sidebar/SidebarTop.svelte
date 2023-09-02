<script>
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import { ArrowBigUp } from 'lucide-svelte';
</script>

<div class="flex items-center justify-between bg-green-50 p-3">
	<Button variant="ghost" size="icon" class="text-lg bg-green-100 hover:bg-green-200 p-2" href="/"
		><ArrowBigUp class="text-green-800" /></Button
	>
	<Avatar.Root class="w-7 h-7">
		<Avatar.Image src="https://avatars.githubusercontent.com/u/56836089?v=4" />
		<Avatar.Fallback>TK</Avatar.Fallback>
	</Avatar.Root>
</div>
