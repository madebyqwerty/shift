import { amqp } from "../deps.ts";
import { RabbitMQ } from "../rabbitmq.ts";

export interface CustomQueue {
  client: RabbitMQ;
  channel: amqp.AmqpChannel;
  queue: amqp.QueueDeclareOk;
}

export interface CustomConsumerQueue extends CustomQueue {
  consumeFromQueue: () => Promise<void>;
}

export interface CustomPublisherQueue extends CustomQueue {
  publishMessage: <T extends Record<string, string>>(
    message: T
  ) => Promise<void>;
}
