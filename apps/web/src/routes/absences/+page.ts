import type { PageLoad } from './$types';
import { client } from '$lib/api/client';
import type { Absence, User } from '@shift/database-service-client';

type UserWithAbsence = User & {absences?:Absence[]}

export const load = (async () => {
	const usersArray: UserWithAbsence[] = await client.apiUsersGet();

	await Promise.all(
		usersArray.map(async (user) => {
			user['absences'] = await client.apiAbsencesUserIdGet({ userId: user.id });
			return user;
		})
	
	)

	return { students: usersArray };
}) satisfies PageLoad;
