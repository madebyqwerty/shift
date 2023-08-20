import { RabbitMQ, UserRequestQueue } from "./rabbitmq.ts";

const client = await RabbitMQ.init();

// User request queue
const channel = await client.createChannel();
const queue = await client.createQueue(channel, "user_request_queue");
const userRequestQueue = new UserRequestQueue(client, channel, queue);
await userRequestQueue.consumeFromQueue();
