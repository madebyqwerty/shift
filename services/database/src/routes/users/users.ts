import { Router } from "../../deps.ts";
import { oakify } from "../../utils/oakify.ts";
import {
  createUser,
  getAllUsersOak,
  getUser,
} from "../../controllers/users.ts";

export const userRouter = new Router({
  prefix: "/api/users",
});

userRouter.get("/", oakify(getAllUsersOak));
userRouter.get("/:id", oakify(getUser));
userRouter.post("/", oakify(createUser));
