import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Student } from '$lib/types';

export const load = (async ({ fetch }) => {
	const res = await fetch('http://127.0.0.1:5000/api/users');
	const data = await res.json();

	if (!res.ok) {
		throw error(res.status, data);
	}

	return {
		students: data as Student[]
	};
}) satisfies PageServerLoad;
