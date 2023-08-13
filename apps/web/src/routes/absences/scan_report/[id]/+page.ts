import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import { scanStore } from '$lib/stores/scanStore';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const scanStoreValue = get(scanStore);

	if (scanStoreValue[params.id]) {
		return scanStoreValue[params.id];
	} else {
		throw error(404, 'Nepodařilo se nám najít tento sken');
	}
}) satisfies PageLoad;
