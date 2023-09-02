<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { ArrowBigUp, CircleOff, Home, Pin, TableProperties, Users2 } from 'lucide-svelte';

	const links = [
		{
			href: '/',
			label: 'Domů',
			icon: Home
		},
		{
			href: '/',
			label: 'Žáci',
			icon: Users2
		},
		{
			href: '/absences',
			label: 'Absence',
			icon: CircleOff
		},
		{
			href: '/pinboard',
			label: 'Nástěnka',
			icon: Pin
		},
		{
			href: '/time-table',
			label: 'Rozvrh',
			icon: TableProperties
		}
	];
</script>

<div
	class="bg-white sticky w-full h-screen lg:!-translate-x-0 flex flex-col border-r-2 border-foreground/10"
>
	<div class="flex items-center justify-between bg-green-50 p-3">
		<Button variant="ghost" size="icon" class="text-lg bg-green-100 hover:bg-green-200 p-2" href="/"
			><ArrowBigUp class="text-green-800" /></Button
		>
		<Avatar.Root class="w-8 h-8">
			<Avatar.Image src="https://avatars.githubusercontent.com/u/56836089?v=4" />
			<Avatar.Fallback>TK</Avatar.Fallback>
		</Avatar.Root>
	</div>
	<div class="flex flex-col p-2">
		{#each links as link}
			<Button variant="ghost" class="justify-start gap-2" href={link.href}>
				<svelte:component this={link.icon} size="18" />
				{link.label}
			</Button>
		{/each}
	</div>
</div>
