import { writable } from 'svelte/store';

export enum ScanStates {
	Success = 'success',
	Loading = 'loading',
	Error = 'error'
}

export type ScanItem =
	| {
			status: ScanStates.Success | ScanStates.Loading;
			data?: Record<string, unknown>;
			name: string;
	  }
	| {
			status: ScanStates.Error;
			error: string;
			name: string;
	  };

interface ScanStore {
	[key: string]: ScanItem;
}

export const scanStore = writable<ScanStore>({});
