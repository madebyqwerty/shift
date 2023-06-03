import { db } from "../../kysely.ts";
import { z } from "../../deps.ts";
import { isValidUUID } from "../../utils/isValidUUID.ts";
import { Router } from "../../deps.ts";

export const userRouter = new Router({
  prefix: "/api",
});

userRouter.get("/users", async (ctx) => {
  const users = await db.selectFrom("User").selectAll().execute();
  ctx.response.status = 200;
  ctx.response.type = "application/json";
  ctx.response.body = users;
  return;
});

const userPostReqBodySchema = z.object({
  name: z.string({ required_error: "required" }),
});

userRouter.get("/users/:id", async (ctx) => {
  const id = ctx.params.id;
  ctx.response.type = "application/json";

  if (!isValidUUID(id)) {
    ctx.response.status = 400;
    ctx.response.body = { id: "not-valid" };
    return;
  }

  const user = await db
    .selectFrom("User")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  if (!user) {
    ctx.response.status = 404;
    ctx.response.body = { user: "not-found" };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = user;
});

userRouter.post("/users", async ({ request, response }) => {
  const body = request.body({ type: "json" });

  const result = userPostReqBodySchema.safeParse(await body.value);

  if (!result.success) {
    response.status = 400;
    response.body = result.error.flatten();
    return;
  }

  const [user] = await db
    .insertInto("User")
    .values({
      name: result.data.name,
    })
    .returning(["id", "name"])
    .execute();

  response.body = user;
});
