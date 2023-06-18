import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Student } from '$lib/types';
import { AbsencesApi } from '@shift/database-service-client/';

export const load = (async ({ fetch, url }) => {
	const res = await fetch('http://127.0.0.1:5000/api/users');
	const data = await res.json();

	if (!res.ok) {
		throw error(res.status, data);
	}

	return {
		students: data as Student[],
		url: url.pathname
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const body = await request.formData();
		body.append('week_number', '4');

		const res = await new Promise((resolve) => setTimeout(resolve, 2000));
		return { success: true };
	}
};
