import { getAllUsers } from "./controllers/users.ts";
import { amqp } from "./deps.ts";
import { Meta, log } from "./logger.ts";

export class RabbitMQ {
  connection: amqp.AmqpConnection;

  private constructor(connection: amqp.AmqpConnection) {
    this.connection = connection;
  }

  static async init() {
    try {
      const hostname = "localhost";
      log.info(`Connecting to RabbitMQ on ${hostname}`, Meta.rabbit);

      const connection = await amqp.connect({
        hostname,
      });
      log.info(`Connected to RabbitMQ`, Meta.rabbit);

      return new RabbitMQ(connection);
    } catch (err) {
      log.critical("Failed to create a connection", Meta.rabbit, err);
      Deno.exit(1);
    }
  }

  async createChannel() {
    return await this.connection.openChannel();
  }

  async createQueue(channel: amqp.AmqpChannel, queue: string) {
    return await channel.declareQueue({ queue });
  }
}
