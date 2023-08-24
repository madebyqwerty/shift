import { createAbsenceScan, AbsenceScan } from "../controllers/absence-scan.ts";
import { amqp } from "../deps.ts";
import { log, Meta } from "../logger.ts";
import { RabbitMQ } from "../rabbitmq.ts";
import { uint8ArrayToJson } from "../utils/uint8Array-to-json.ts";
import { CustomConsumerQueue } from "./queue.ts";

export class AbsenceQueueController implements CustomConsumerQueue {
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
    await this.channel.consume(this.queue, async (info, props, data) => {
      log.debug("Received request to create a new absenceScan", Meta.rabbit);

      const absences = uint8ArrayToJson<AbsenceScan[]>(data);

      await createAbsenceScan(absences);

      log.debug("Fetching all users from database", Meta.db);

      log.debug("Sending all users back to user_queue", Meta.rabbit);
    });
  }
}
