import { db } from "../../kysely.ts";
import { isValidUUID } from "../../utils/isValidUUID.ts";
import { Router } from "../../deps.ts";
import { z } from "../../deps.ts";

export const absenceRouter = new Router({
  prefix: "/api",
});

absenceRouter.get("/absences/:userId", async (ctx) => {
  const { userId } = ctx.params;

  if (!isValidUUID(userId)) {
    ctx.response.status = 400;
    ctx.response.body = { id: "not-valid" };
    return;
  }

  console.log(userId);

  const absences = await db
    .selectFrom("Absence")
    .innerJoin("User", "User.id", "Absence.userId")
    .select(["User.name", "date", "userId", "Absence.id", "lesson"])
    .where("Absence.userId", "=", userId)
    .execute();

  console.log(absences);

  if (absences.length === 0) {
    ctx.response.status = 404;
    ctx.response.body = { absences: "no-absences" };
    return;
  }

  ctx.response.body = absences;
});

absenceRouter.post("/absences/scan", async (ctx) => {
  const formDataReader = ctx.request.body({ type: "form-data" }).value;
  const formDataBody = await formDataReader.read();

  const files = formDataBody.files;

  if (files) {
    const [file] = files;
    if (file.filename) {
      const fileBytes = await Deno.readFile(file.filename);
      ctx.response.status = 200;
      ctx.response.headers.set("Content-Type", file.contentType);
      ctx.response.body = fileBytes;
      return;
    }
  }

  ctx.response.status = 400;
  ctx.response.body = { error: "no-image" };
});

const absenceBody = z.object({
  lesson: z.number({ required_error: "required" }),
  date: z.string({ required_error: "required" }),
});

absenceRouter.post("/absences/:userId", async (ctx) => {
  const { userId } = ctx.params;
  const body = ctx.request.body({ type: "json" });

  const result = absenceBody.safeParse(await body.value);

  if (!result.success) {
    ctx.response.status = 400;
    ctx.response.body = result.error.flatten();
    return;
  }

  if (!isValidUUID(userId)) {
    ctx.response.status = 400;
    ctx.response.body = { id: "not-valid" };
    return;
  }

  const newAbsence = await db
    .insertInto("Absence")
    .values({ lesson: result.data.lesson, date: result.data.date, userId })
    .returning(["id", "lesson", "date"])
    .execute();

  ctx.response.body = newAbsence;
});
