import { writable } from 'svelte/store';

type ScanItem =
	| {
			status: 'success' | 'loading';
			data?: Record<string, unknown>;
	  }
	| {
			status: 'error';
			error: string;
	  };

interface ScanStore {
	[key: string]: ScanItem;
}

export const scanStore = writable<ScanStore>({});
