import { amqp } from "../deps.ts";

export class RabbitMQ {
  #connection: amqp.AmqpConnection;

  private constructor(connection: amqp.AmqpConnection) {
    this.#connection = connection;
  }

  static async init() {
    const connection = await amqp.connect();

    return new RabbitMQ(connection);
  }

  async createChannel() {
    return await this.#connection.openChannel();
  }

  async createWelcomeChannel() {
    const channel = await this.createChannel();
    await channel.declareQueue({ queue: "welcome" });

    return channel;
  }

  async sendHelloWorldToWelcomeQueue() {
    const channel = await this.createWelcomeChannel();
    await channel.publish(
      { routingKey: "welcome" },
      { contentType: "application/json" },
      new TextEncoder().encode(JSON.stringify({ message: "Hello World" }))
    );
  }

  async consumeHelloWorldFromWelcomeQueue() {
    const channel = await this.createChannel();

    await channel.declareQueue({ queue: "welcome" });
    await channel.consume({ queue: "welcome" }, async (args, props, data) => {
      console.log("Received:", new TextDecoder().decode(data));
      await channel.ack({ deliveryTag: args.deliveryTag });
    });
  }
}

const rabbitmq = await RabbitMQ.init();
await rabbitmq.consumeHelloWorldFromWelcomeQueue();
