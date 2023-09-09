import { client } from '$lib/api/client';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const scan = client
		.apiAbsenceScanScanIdGet({
			scanId: params.scan_id
		})
		.catch((e) => {
			console.log(e);
			throw error(500, 'Unable to load scan');
		});

	return { scan };
}) satisfies PageLoad;
