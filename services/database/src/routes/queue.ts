import { Router } from "../deps.ts";
import { RabbitMQ } from "../rabbitmq.ts";

export const queueRouter = new Router({
  prefix: "/api/queue",
});

queueRouter.get("/send", async (ctx) => {
  const rabbitmq = await RabbitMQ.init();
  await rabbitmq.welcome.sendHelloWorldToWelcomeQueue();
  ctx.response.body = "Hello World sent to welcome queue";
});
