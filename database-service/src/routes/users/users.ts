import { db } from "../../kysely.ts";
import { z } from "../../deps.ts";
import { isValidUUID } from "../../utils/isValidUUID.ts";
import { Router } from "../../deps.ts";

export const userRouter = new Router({
  prefix: "/api",
});

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    required:
 *     - name
 *    properties:
 *      name:
 *        type: string
 *        description: The user's name.
 *      id:
 *        type: string
 *        description: The user's id.
 *    example:
 *      name: John Doe
 *      id: f7cabd53-49e1-4c93-b59e-6035811b134d
 *   ErrorCodes:
 *    type: string
 *    enum:
 *      - required
 *      - not-found
 */

/**
 * @openapi
 * tags:
 *  name: Users
 *  description: API for managing users.
 * /users:
 *  get:
 *   summary: Returns a list of users.
 *   tags: [Users]
 *   responses:
 *    200:
 *      description: The list of users.
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/User'
 *    400:
 *     description: Bad request.
 *     content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *          name:
 *            type: string
 *            enum:
 *             - required
 */
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

/**
 * @openapi
 * /users/{id}:
 *  get:
 *   summary: Returns a user by ID.
 *   tags: [Users]
 *   responses:
 *    200:
 *      description: The user.
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    400:
 *      description: Id is not valid.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *               type: string
 *               enum:
 *                - not-valid
 *    404:
 *      description: User not found
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          properties:
 *            user:
 *             type: string
 *             enum:
 *              - not-found
 */
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

/**
 * @openapi
 * /users:
 *  post:
 *   summary: Creates a new user.
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: The user's name.
 *            example: Tomáš Kebrle
 *   responses:
 *    200:
 *      description: The created user.
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/User'
 *    400:
 *     description: Bad request.
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *          fieldErrors:
 *            type: object
 *            properties:
 *              name:
 *                type: array
 *                items:
 *                  type: string
 *                  enum: [required]
 *            example:
 *              name: [required]
 */
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
