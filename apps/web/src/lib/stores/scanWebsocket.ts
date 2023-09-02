import { writable } from 'svelte/store';

type Status = 'STARTED' | 'ERROR' | 'SAVED' | 'PROCCESED';

export type WebSocketEvent = {
	status: Status;
	errors: string[];
	scan_id: string;
};

type Scan = {
	status: Status;
};

export const scanStore = writable<Record<string, Scan>>({});
