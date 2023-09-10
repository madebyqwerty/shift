import type { PageLoad } from './$types';
import { client } from '$lib/api/client';

export const load = (async () => {
	const scans = client.apiAbsenceScanGet();
	return { scans };
}) satisfies PageLoad;
