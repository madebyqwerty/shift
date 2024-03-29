<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible';
	import * as Card from '$lib/components/ui/card';
	import * as Separator from '$lib/components/ui/separator';

	import { ChevronsDownUp, ChevronsUpDown, FileScan, Scan } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { scanStore, type WebSocketEvent } from '$lib/stores/scanWebsocket';
	import toast from 'svelte-french-toast';
	import { addToStore } from '$lib/stores/addToStore';
	import BarLoader from 'svelte-loading-spinners/BarLoader.svelte';
	import * as HoverCard from '$lib/components/ui/hover-card';

	let open: boolean = Object.keys($scanStore).length !== 0;

	const socket = new WebSocket('ws://localhost:5003/ws/shift');

	socket.addEventListener('open', () => {
		toast.success('Připojeno k serveru');
	});

	socket.addEventListener('error', () => {
		toast.error('Nepodařilo se nám připojit k serveru');
	});

	socket.addEventListener('message', (message) => {
		console.log('NEW MESSAGE:', message.data);
		const data = JSON.parse(message.data) as WebSocketEvent;
		addToStore(scanStore)(data.scan_id)({ status: data.status });
	});

	socket.addEventListener('close', () => {
		toast.error('Odpojeno ze serveru');
	});
</script>

<div class="fixed bottom-4 right-4">
	<Collapsible.Root class="w-[350px] space-y-2" bind:open>
		<Collapsible.Trigger class="w-full">
			<Card.Root>
				<Card.Header class="p-4">
					<div class="inline-flex justify-between items-center w-full">
						<span class="inline-flex items-center gap-2">
							<FileScan size={18} />
							Skeny
							<div class="bg-primary/20 text-foreground rounded-full w-6 h-6">
								{Object.keys($scanStore).length}
							</div>
						</span>
						{#if open}
							<ChevronsDownUp class="h-4 w-4" />
						{:else}
							<ChevronsUpDown class="h-4 w-4" />
						{/if}
					</div>
				</Card.Header>
			</Card.Root>
		</Collapsible.Trigger>
		<Collapsible.Content class="space-y-2">
			<Card.Root class="overflow-scroll bg-gray-50">
				{#each Object.entries($scanStore) as [id, scan], i (id)}
					<Card.Content
						class="flex items-center justify-between transition-all p-4 py-2  hover:bg-gray-100/80"
					>
						<HoverCard.Root>
							<HoverCard.Trigger>
								<span
									class="inline-flex items-center gap-2 {scan.status === 'STARTED' &&
										'text-gray-500'}"
								>
									<Scan
										size={18}
										strokeWidth={2.5}
										class="text-gray-700 {scan.status === 'STARTED' &&
											'!text-gray-400'} {scan.status === 'PROCCESED' &&
											'!text-gray-600'} {scan.status === 'ERROR' &&
											'!text-red-700'} {scan.status === 'SAVED' && '!text-green-700'}"
									/>
									Sken {i + 1}
								</span>
							</HoverCard.Trigger>
							<HoverCard.Content>{id}</HoverCard.Content>
						</HoverCard.Root>
						{#if scan.status === 'STARTED'}
							<div class="overflow-hidden max-h-1 rounded-full text-green-500">
								<BarLoader size={100} color="rgb(34 197 94)" />
							</div>
						{:else if scan.status === 'SAVED'}
							<Button variant="link" class="p-0 h-auto" href="/scans/{id}">Zobrazit</Button>
						{:else if scan.status === 'ERROR'}
							<span class="text-red-600 text-sm font-medium">Něco se pokazilo</span>
						{:else if scan.status === 'PROCCESED'}
							<span class="text-foreground/70 font-medium text-sm">Ukládání</span>
						{/if}
					</Card.Content>

					{#if i !== Object.entries($scanStore).length - 1}
						<Separator.Root />
					{/if}
				{:else}
					<Card.Content class="flex items-center justify-between p-4">
						<span class="inline-flex items-center gap-2"> Momentálně neprobíhájí žádné skeny </span>
					</Card.Content>
				{/each}
			</Card.Root>
		</Collapsible.Content>
	</Collapsible.Root>
</div>
