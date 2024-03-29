import { z } from "../deps.ts";
import { db } from "../kysely.ts";
import { isValidUUID } from "../utils/isValidUUID.ts";
import { Controller, error, success } from "../utils/oakify.ts";

export const getAllUsers = async () =>
  await db.selectFrom("User").selectAll().execute();

export const getAllUsersOak: Controller<"/"> = async () =>
  success(await getAllUsers());

export const getUser: Controller<"/:id"> = async (ctx) => {
  const { id } = ctx.params;

  if (!isValidUUID(id)) {
    return error(
      {
        id: ["not-valid"],
      },
      400
    );
  }

  const user = await db
    .selectFrom("User")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  if (!user) {
    return error(
      {
        user: ["not-found"],
      },
      404
    );
  }

  return success(user);
};

const userPostReqBodySchema = z.object({
  name: z.string({ required_error: "required" }),
});

export const createUser: Controller<"/"> = async ({ request }) => {
  const body = request.body({ type: "json" });

  const result = userPostReqBodySchema.safeParse(await body.value);

  if (!result.success) {
    console.log(result);
    return error({ ...result.error.formErrors.fieldErrors }, 400);
  }

  const [user] = await db
    .insertInto("User")
    .values({
      name: result.data.name,
    })
    .returning(["id", "name"])
    .execute();

  return success(user);
};
