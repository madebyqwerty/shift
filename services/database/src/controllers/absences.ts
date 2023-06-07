import { z } from "../deps.ts";
import { db } from "../kysely.ts";
import { isValidUUID } from "../utils/isValidUUID.ts";
import { Controller, error, success } from "../utils/oakify.ts";

export const getByUserId: Controller<"/:userId"> = async (ctx) => {
  const { userId } = ctx.params;

  if (!isValidUUID(userId)) {
    return error(
      {
        userId: "not-valid",
      },
      400
    );
  }

  const absences = await db
    .selectFrom("Absence")
    .innerJoin("User", "User.id", "Absence.userId")
    .select(["User.name", "date", "userId", "Absence.id", "lesson"])
    .where("Absence.userId", "=", userId)
    .execute();

  return success({ absences });
};

const absenceBody = z.object({
  lesson: z.number({ required_error: "required" }),
  date: z.string({ required_error: "required" }),
});

export const createAbsence: Controller<"/:userId"> = async (ctx) => {
  const { userId } = ctx.params;
  const body = ctx.request.body({ type: "json" });

  const result = absenceBody.safeParse(await body.value);

  if (!result.success) {
    return error(result.error.flatten());
  }

  if (!isValidUUID(userId)) {
    return error({ id: "not-valid" });
  }

  const newAbsence = await db
    .insertInto("Absence")
    .values({ lesson: result.data.lesson, date: result.data.date, userId })
    .returning(["id", "lesson", "date"])
    .execute();

  return success({ newAbsence });
};
