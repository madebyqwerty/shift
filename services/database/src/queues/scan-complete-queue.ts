import { AmqpChannel } from "https://deno.land/x/amqp@v0.23.1/mod.ts";
import { QueueDeclareOk } from "https://deno.land/x/amqp@v0.23.1/src/amqp_types.ts";
import { RabbitMQ } from "../rabbitmq.ts";
import { CustomConsumerQueue, CustomPublisherQueue } from "./queue.ts";
import { Meta, log } from "../logger.ts";
import { uint8ArrayToJson } from "../utils/uint8Array-to-json.ts";
import { db } from "../kysely.ts";

type ScanComplete = {
  scan_id: string;
  absences: Array<{
    user_id: string;
    absence: number;
    date: string;
  }>;
};

export class ScanCompleteQueueController implements CustomConsumerQueue {
  client: RabbitMQ;
  channel: AmqpChannel;
  queue: QueueDeclareOk;
  scanQueue: CustomPublisherQueue;
  constructor(
    client: RabbitMQ,
    channel: AmqpChannel,
    queue: QueueDeclareOk,
    scanQueue: CustomPublisherQueue
  ) {
    this.client = client;
    this.channel = channel;
    this.queue = queue;
    this.scanQueue = scanQueue;
  }

  async consumeFromQueue() {
    log.debug("Started consuming from scan_complete queue", Meta.rabbit);
    await this.channel.consume(
      { queue: this.queue.queue },
      async (args, _props, data) => {
        log.debug("Received request to complete a scan", Meta.rabbit);

        const message = uint8ArrayToJson<ScanComplete>(data);

        console.log(message);

        const absences = message.absences?.map((absence) => ({
          // @ts-ignore
          user_id: absence.user_id,
          lesson: absence.absence,
          date: absence.date,
        }));

        await db
          .deleteFrom("AbsenceScan")
          .where("AbsenceScan.id", "=", message.scan_id)
          .execute()
          .then(() => {
            log.debug("Deleted scan from database", Meta.db);
          });

        await db
          .insertInto("Absence")
          .values(absences)
          .execute()
          .then(() => {
            log.debug("Successfully saved completed absences", Meta.db);
            this.scanQueue
              .publishMessage({
                status: "COMPLETED",
                scan_id: message.scan_id,
              })
              .then(() => {
                log.debug("Sent COMPLETED status to scan:shift", Meta.rabbit);
              });
          })
          .catch((e) => {
            log.error("Failed to save completed absences" + e, Meta.db);
            this.scanQueue.publishMessage({
              status: "ERROR",
              scan_id: message.scan_id,
              errors: ["postgres/failed-to-save-completed-absences"],
            });
          });

        await this.channel.ack({ deliveryTag: args.deliveryTag });
      }
    );
  }
}
