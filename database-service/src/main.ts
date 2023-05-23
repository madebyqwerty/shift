import { port } from "./constants.ts";
import { docsRouter } from "./routes/docs/docs.ts";
import { userRouter } from "./routes/users/users.ts";
import { absenceRouter } from "./routes/absences/absences.ts";
import { Application } from "https://deno.land/x/oak@v12.4.0/mod.ts";

export const app = new Application();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log("═════════════════════════════════");
  console.info(
    `🌐 ${ctx.request.method}: ${ctx.request.url} by ${ctx.request.ip}`
  );
  console.info(`🕒 proccesed in ${rt}`);
  console.info("STATUS:", ctx.response.status);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(docsRouter.routes());
app.use(docsRouter.allowedMethods());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.use(absenceRouter.routes());
app.use(absenceRouter.allowedMethods());

app.addEventListener("error", (e) => {
  console.log("COTO JE ZA SRA4KU");
  console.log("WHAT THE FUCK", e);
});

console.log("═════════════════════════════════");
console.log(`      🚀 LAUNCHING on ${port}    `);
console.log("═════════════════════════════════");
await app.listen({ port });
