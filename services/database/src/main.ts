import { RabbitMQ } from "./rabbitmq.ts";
import { UserRequestQueue } from "./queues/user-requeust-queue.ts";
import { port } from "./constants.ts";
import { userRouter } from "./routes/users/users.ts";
import { absenceRouter } from "./routes/absences.ts";
import { Application, oakCors } from "./deps.ts";
import { Meta, log } from "./logger.ts";
import { AbsenceQueueController } from "./queues/absence-queue.ts";
import { ScanQueue } from "./queues/scan-queue.ts";

// Oak stuff
export const app = new Application();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  log.debug(
    `${ctx.request.method}:${ctx.response.status} > ${ctx.request.url.pathname} proccesed in ${rt}`,
    Meta.oak
  );
});

// Middleware function to set Access-Control-Allow-Origin header
app.use(oakCors());

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.use(absenceRouter.routes());
app.use(absenceRouter.allowedMethods());

app.addEventListener("listen", () => {
  log.info(`LAUNCHING on http://localhost:${port}`, Meta.oak);
});

app.listen({ port });

// RabbitMQ stuff
const client = await RabbitMQ.init();
const channel = await client.createChannel();
// User request queue
const queue = await client.createQueue(channel, "user_request_queue");
const userRequestQueue = new UserRequestQueue(client, channel, queue);
userRequestQueue.consumeFromQueue();

// ScanQueue
const scanQueue = await client.createQueue(channel, "scan:shift");
const scanQueueController = new ScanQueue(client, channel, scanQueue);

// Absence queue
const absenceQueue = await client.createQueue(channel, "absence_queue");
const absenceQueueController = new AbsenceQueueController(
  client,
  channel,
  absenceQueue,
  scanQueueController
);
absenceQueueController.consumeFromQueue();
