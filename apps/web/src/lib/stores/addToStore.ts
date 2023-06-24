import type { Writable } from 'svelte/store';

export const addToStore =
	<T>(store: Writable<T>) =>
	<K>(key: string) =>
	(data: K) =>
		store.update((s) => ({ ...s, [key]: data }));
