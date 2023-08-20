import { getAllUsers } from "./controllers/users.ts";
import { amqp } from "./deps.ts";
import { Meta, log } from "./logger.ts";

export class RabbitMQ {
  connection: amqp.AmqpConnection;

  private constructor(connection: amqp.AmqpConnection) {
    this.connection = connection;
  }

  static async init() {
    const connection = await amqp.connect();

    log.info("Connected to RabbitMQ", Meta.rabbit);

    return new RabbitMQ(connection);
  }

  async createChannel() {
    return await this.connection.openChannel();
  }

  async createQueue(channel: amqp.AmqpChannel, queue: string) {
    return await channel.declareQueue({ queue });
  }
}

export class UserRequestQueue {
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
    await this.channel.consume({ queue: this.queue.queue }, async () => {
      log.debug("Received request for all users", "rabbitMQ");
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
    });
  }
}
