import { getAllUsers } from "../controllers/users.ts";
import { amqp } from "../deps.ts";
import { log, Meta } from "../logger.ts";
import { RabbitMQ } from "../rabbitmq.ts";

export class AbsenceQueue {
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
    log.debug("Started onsuming from absence-queue", Meta.rabbit);
    await this.channel.consume({ queue: this.queue.queue }, async () => {
      log.debug("Received request to create a new absenceScan", Meta.rabbit);

      log.debug("Fetching all users from database", Meta.db);

      log.debug("Sending all users back to user_queue", Meta.rabbit);
    });
  }
}
