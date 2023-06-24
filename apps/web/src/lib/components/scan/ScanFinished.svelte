<script lang="ts">
	import RoundedIcon from '../RoundedIcon.svelte';
	import { XCircle, CheckCircle2, Loader2 } from 'lucide-svelte';
	import type { ScanStates } from '$lib/stores/scanStore';

	const icons = {
		success: CheckCircle2,
		error: XCircle,
		loading: Loader2
	};

	export let status: ScanStates;
	export let name: string;
	export let id: string;
</script>

<a href={`/absences/scan_report/${id}`}>
	<div class="flex items-center whitespace-nowrap overflow-hidden text-ellipsis">
		<RoundedIcon
			icon={icons[status]}
			size={20}
			color={status === 'success' ? 'bg-primary-100' : 'bg-red-100'}
		/>
		<p class="ml-2">{name}</p>
	</div>
</a>
