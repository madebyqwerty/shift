import { db } from "../../kysely.ts";
import { isValidUUID } from "../../utils/isValidUUID.ts";
import { Router } from "../../deps.ts";
import { z } from "../../deps.ts";

export const absenceRouter = new Router({
  prefix: "/api",
});

/**
 * @swagger
 * components:
 *  schemas:
 *   Absence:
 *    type: object
 *    required:
 *     - name
 *     - userId
 *     - id
 *     - lesson
 *     - date
 *    properties:
 *      name:
 *        type: string
 *        description: The user's name.
 *      userId:
 *        type: string
 *        description: The user's id.
 *      id:
 *        type: Absence ID
 *        description: The absence's id.
 *      lesson:
 *        type: number
 *        description: The lesson number
 *      date:
 *        type: string
 *        description: Date of the absence
 *    example:
 *      name: John Doe
 *      userId: 7d6fd0c4-6b3d-46d9-9840-5e8874c9c646
 *      id: f7cabd53-49e1-4c93-b59e-6035811b134d
 *      lesson: 2
 *      date: 2023-05-14
 *   ErrorCodes:
 *    type: string
 *    enum:
 *      - required
 *      - not-found
 */

/**
 * @openapi
 * tags:
 *  name: Absences
 *  description: API for managing absences.
 * /absences/{userId}:
 *  get:
 *   summary: Returns a list of absences for a given user.
 *   tags: [Absences]
 *   responses:
 *    200:
 *      description: The list of absences.
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Absence'
 *    400:
 *     description: Bad request.
 *     content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *          id:
 *            type: string
 *            enum:
 *             - required
 *             - not-valid
 */
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
/**
 * @openapi
 * /absences/scan:
 *  post:
 *    summary: Creates a new absence by scanning a paper.
 *    tags: [Absences]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              image:
 *                type: string
 *                format: binary
 */
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

/**
 * @openapi
 * /absences/{userId}:
 *  post:
 *    summary: Creates a new absence.
 *    tags: [Absences]
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          properties:
 *            lesson:
 *              type: number
 *              example: 3
 *            date:
 *              type: string
 *              example: "2023-05-14"
 *    responses:
 *     200:
 *       description: The absence was successfully created.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              id:
 *                type: string
 *                description: The absence id.
 *                example: 7d6fd0c4-6b3d-46d9-9840-5e8874c9c646
 *              lesson:
 *                type: number
 *                description: The lesson number
 *                example: 2
 *              date:
 *                type: string
 *                description: Date of the absence
 *                example: "2023-05-14"
 */
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
