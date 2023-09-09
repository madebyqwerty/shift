import { Configuration, DefaultApi } from '@shift/database-service-client';

const config = new Configuration({
	basePath: 'http://127.0.0.1:5003'
});

export const client = new DefaultApi(config);
