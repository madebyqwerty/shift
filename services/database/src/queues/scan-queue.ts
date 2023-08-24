import { AmqpChannel } from "https://deno.land/x/amqp@v0.23.1/mod.ts";
import { RabbitMQ } from "../rabbitmq.ts";
import { CustomPublisherQueue } from "./queue.ts";
import { QueueDeclareOk } from "https://deno.land/x/amqp@v0.23.1/src/amqp_types.ts";

export class ScanQueue implements CustomPublisherQueue {
  client: RabbitMQ;
  channel: AmqpChannel;
  queue: QueueDeclareOk;

  constructor(client: RabbitMQ, channel: AmqpChannel, queue: QueueDeclareOk) {
    this.client = client;
    this.channel = channel;
    this.queue = queue;
  }

  publishMessage: <T extends Record<string, unknown>>(
    message: T
  ) => Promise<void> = async (message) => {
    await this.channel.publish(
      {
        routingKey: this.queue.queue,
      },
      {
        contentType: "application/json",
      },
      new TextEncoder().encode(JSON.stringify(message))
    );
  };
}
