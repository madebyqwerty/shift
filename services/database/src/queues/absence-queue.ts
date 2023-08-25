import { isUndefined } from "https://cdn.jsdelivr.net/npm/kysely/dist/esm/util/object-utils.js";
import { createAbsenceScan, AbsenceScan } from "../controllers/absence-scan.ts";
import { amqp } from "../deps.ts";
import { log, Meta } from "../logger.ts";
import { RabbitMQ } from "../rabbitmq.ts";
import { uint8ArrayToJson } from "../utils/uint8Array-to-json.ts";
import { CustomConsumerQueue } from "./queue.ts";
import { ScanQueue } from "./scan-queue.ts";

export class AbsenceQueueController implements CustomConsumerQueue {
  readonly client: RabbitMQ;
  readonly channel: amqp.AmqpChannel;
  readonly queue: amqp.QueueDeclareOk;
  readonly scanQueue: ScanQueue;

  constructor(
    client: RabbitMQ,
    channel: amqp.AmqpChannel,
    queue: amqp.QueueDeclareOk,
    scanQueue: ScanQueue
  ) {
    this.client = client;
    this.channel = channel;
    this.queue = queue;
    this.scanQueue = scanQueue;
  }

  async consumeFromQueue() {
    log.debug("Started onsuming from absence-queue", Meta.rabbit);
    await this.channel.consume(this.queue, async (args, _props, data) => {
      log.debug("Received request to create a new absenceScan", Meta.rabbit);

      const absences = uint8ArrayToJson<AbsenceScan[]>(data);

      if (absences.length === 0) {
        log.debug(Meta.rabbit, "No absences found");
        this.scanQueue.publishMessage({
          status: "ERROR",
          errors: ["postgres/no-absences-found"],
        });
      }

      const result = await createAbsenceScan(absences);

      if (isUndefined(result)) {
        this.scanQueue.publishMessage({
          status: "ERROR",
          errors: ["postgres/failed-to-save-absences"],
        });
        log.error(Meta.db, "Failed to save absences");
        return;
      }

      log.debug(Meta.db, "Saved absences to database");

      this.scanQueue.publishMessage({
        status: "SAVED",
        "absence-scan-id": result?.id,
      });

      log.debug(Meta.rabbit, "Sent SAVED status to scanQueue");
      await this.channel.ack({ deliveryTag: args.deliveryTag });
    });
  }
}
