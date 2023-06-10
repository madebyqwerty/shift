import { Router } from "../../deps.ts";
import { oakify } from "../../utils/oakify.ts";
import { createUser, getAllUsers, getUser } from "../../controllers/users.ts";

export const userRouter = new Router({
  prefix: "/api/users",
});

userRouter.get("/", oakify(getAllUsers));
userRouter.get("/:id", oakify(getUser));
userRouter.post("/", oakify(createUser));
