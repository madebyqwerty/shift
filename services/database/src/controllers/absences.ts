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
