import { Configuration, DefaultApi } from '@shift/database-service-client';

const config = new Configuration({
	basePath: 'http://127.0.0.1:5000/api'
});

export const api = new DefaultApi(config);
