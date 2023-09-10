<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { ArrowBigUp, CircleOff, Home, Pin, TableProperties, Users2, Scan } from 'lucide-svelte';
	import SidebarTop from './SidebarTop.svelte';

	const links = [
		{
			href: '/',
			label: 'Domů',
			icon: Home
		},
		{
			href: '/absences',
			label: 'Absence',
			icon: CircleOff
		},
		{
			href: '/scans',
			label: 'Skeny',
			icon: Scan
		},
		{
			href: '/pinboard',
			label: 'Nástěnka',
			icon: Pin
		},
		{
			href: '/',
			label: 'Žáci',
			icon: Users2
		},
		{
			href: '/time-table',
			label: 'Rozvrh',
			icon: TableProperties
		}
	];
</script>

<div class="flex flex-col p-2">
	{#each links as link}
		<Button variant="ghost" class="justify-start gap-2" href={link.href}>
			<svelte:component this={link.icon} size="18" />
			{link.label}
		</Button>
	{/each}
</div>
