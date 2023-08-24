import { getAllUsers } from "../controllers/users.ts";
import { amqp } from "../deps.ts";
import { log, Meta } from "../logger.ts";
import { RabbitMQ } from "../rabbitmq.ts";
import { CustomConsumerQueue } from "./queue.ts";

export class UserRequestQueue implements CustomConsumerQueue {
  readonly client: RabbitMQ;
  readonly channel: amqp.AmqpChannel;
  readonly queue: amqp.QueueDeclareOk;

  constructor(
    client: RabbitMQ,
    channel: amqp.AmqpChannel,
    queue: amqp.QueueDeclareOk
  ) {
    this.client = client;
    this.channel = channel;
    this.queue = queue;
  }

  async consumeFromQueue() {
    log.debug("Started onsuming from user_queue", Meta.rabbit);
    await this.channel.consume({ queue: this.queue.queue }, async (args) => {
      log.debug("Received request for all users", Meta.rabbit);
      const userQueue = await this.client.createQueue(
        this.channel,
        "user_queue"
      );

      log.debug("Fetching all users from database", Meta.db);
      const users = await getAllUsers();

      log.debug("Sending all users back to user_queue", Meta.rabbit);
      this.channel.publish(
        { routingKey: userQueue.queue },
        { contentType: "application/json" },
        new TextEncoder().encode(JSON.stringify(users))
      );
      await this.channel.ack({ deliveryTag: args.deliveryTag });
    });
  }
}
