import type { PageLoad } from './$types';
import { client } from '$lib/api/client';
import { error } from '@sveltejs/kit';

export const load = (async () => {
	const users = await client.apiUsersGet().catch((e) => {
		throw error(500, 'Nepodařilo se nám získat uživatele');
	});

	if (users.length === 0) {
		throw error(500, 'Nepodařilo se nám získat uživatele');
	}

	const userPromises = users.map(async (user) => ({
		...user,
		absences: await client.apiAbsencesUserIdGet({ userId: user.id })
	}));

	const students = await Promise.all(userPromises).catch(() => {
		throw error(500, 'Nepodařilo se nám dodatečné informace o uživateli');
	});

	return { students };
}) satisfies PageLoad;
