import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Student } from '$lib/types';
import { AbsencesApi } from '@shift/database-service-client/';

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

export const actions: Actions = {
	default: async ({ request }) => {
		const body = await request.formData();
		body.append('week_number', '4');

		const res = await fetch('http://localhost:5001/api/scan', {
			method: 'POST',
			body
		});

		if (res.ok) {
			const data = await res.json();
			console.log(data);
			return data;
		} else {
			console.log(res.status);
			return 'AHoj';
		}
	}
};
