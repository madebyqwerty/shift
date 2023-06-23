import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { usersClient } from '$lib/api/client';

export const load = (async ({ url }) => {
	const data = await usersClient.usersGet().catch((err) => {
		throw error(err.status, err.message);
	});

	return {
		students: data,
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
