import { writable } from 'svelte/store';

interface ScanStore {
	status: 'succes' | 'error' | 'loading';
	data: Record<string, unknown>[];
}

export const scanStore = writable<ScanStore[]>();
