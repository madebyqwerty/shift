import { amqp } from "./deps.ts";

interface Channels {
  welcome: amqp.AmqpChannel;
}

export class RabbitMQ {
  connection: amqp.AmqpConnection;
  channels: Channels;
  readonly welcome: WelcomeQueue;

  private constructor(connection: amqp.AmqpConnection, channels: Channels) {
    this.connection = connection;
    this.channels = channels;
    this.welcome = new WelcomeQueue(this);
  }

  static async init() {
    const connection = await amqp.connect();
    const channels = {
      welcome: await connection.openChannel(),
    };

    return new RabbitMQ(connection, channels);
  }

  async createChannel() {
    return await this.connection.openChannel();
  }
}

class WelcomeQueue {
  readonly client: RabbitMQ;
  readonly channel: amqp.AmqpChannel;

  constructor(client: RabbitMQ) {
    this.client = client;
    this.channel = client.channels.welcome;
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
