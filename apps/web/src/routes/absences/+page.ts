import type { PageLoad } from './$types';
import { client } from '$lib/api/client';

export const load = (async () => {
	const usersArray = await client.apiUsersGet();

	const userArrayWithAbsence =await Promise.all(
		usersArray.map(async (user) => ({
			...user, absences: await client.apiAbsencesUserIdGet({ userId: user.id });
			
		}))
	
	)

	return { students: userArrayWithAbsence };
}) satisfies PageLoad;
