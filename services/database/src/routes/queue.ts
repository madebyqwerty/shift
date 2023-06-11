import { Router } from "../deps.ts";
import { WelcomeQueue } from "../rabbitmq/index.ts";

export const queueRouter = new Router({
  prefix: "/api/queue",
});

queueRouter.get("/send", async (ctx) => {
  const rabbitmq = await WelcomeQueue.init();
  await rabbitmq.sendHelloWorldToWelcomeQueue();
  ctx.response.body = "Hello World sent to welcome queue";
});
