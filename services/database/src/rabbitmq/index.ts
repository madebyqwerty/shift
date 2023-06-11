import { amqp } from "../deps.ts";

class RabbitMQ {
  #connection: amqp.AmqpConnection;

  constructor(connection: amqp.AmqpConnection) {
    this.#connection = connection;
  }

  async createChannel() {
    return await this.#connection.openChannel();
  }
}

export class WelcomeQueue extends RabbitMQ {
  channel: amqp.AmqpChannel;

  private constructor(
    connection: amqp.AmqpConnection,
    channel: amqp.AmqpChannel
  ) {
    super(connection);
    this.channel = channel;
  }

  static async init() {
    const connection = await amqp.connect();
    const channel = await connection.openChannel();
    await channel.declareQueue({ queue: "welcome" });

    return new WelcomeQueue(connection, channel);
  }

  async sendHelloWorldToWelcomeQueue() {
    await this.channel.publish(
      { routingKey: "welcome" },
      { contentType: "application/json" },
      new TextEncoder().encode(JSON.stringify({ message: "Hello World" }))
    );
  }

  async consumeHelloWorldFromWelcomeQueue() {
    await this.channel.declareQueue({ queue: "welcome" });
    await this.channel.consume(
      { queue: "welcome" },
      async (args, props, data) => {
        console.log("Received:", new TextDecoder().decode(data));
        await this.channel.ack({ deliveryTag: args.deliveryTag });
      }
    );
  }
}

const rabbitmq = await WelcomeQueue.init();
await rabbitmq.consumeHelloWorldFromWelcomeQueue();
