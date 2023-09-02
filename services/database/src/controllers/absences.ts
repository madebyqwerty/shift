import { z } from "../deps.ts";
import { db } from "../kysely.ts";
import { isValidUUID } from "../utils/isValidUUID.ts";
import { Controller, error, success } from "../utils/oakify.ts";

export const getByUserId: Controller<"/:user_id"> = async (ctx) => {
  const { user_id } = ctx.params;

  if (!isValidUUID(user_id)) {
    return error(
      {
        userId: ["not-valid"],
      },
      400
    );
  }

  const absences = await db
    .selectFrom("Absence")
    .innerJoin("User", "User.id", "Absence.user_id")
    .select(["User.name", "date", "user_id", "Absence.id", "lesson"])
    .where("Absence.user_id", "=", user_id)
    .execute();

  return success(absences);
};

const absenceBody = z.object({
  lesson: z.number({ required_error: "required" }),
  date: z.string({ required_error: "required" }),
});

export const createAbsence: Controller<"/:user_id"> = async (ctx) => {
  const { user_id } = ctx.params;
  const body = ctx.request.body({ type: "json" });

  const result = absenceBody.safeParse(await body.value);

  if (!result.success) {
    return error(result.error.formErrors.fieldErrors);
  }

  if (!isValidUUID(user_id)) {
    return error({ id: ["not-valid"] });
  }

  const newAbsence = await db
    .insertInto("Absence")
    .values({
      lesson: result.data.lesson,
      date: result.data.date,
      user_id,
    })
    .returning(["id", "lesson", "date"])
    .execute();

  return success(newAbsence);
};
