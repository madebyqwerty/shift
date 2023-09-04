import { Router } from "../deps.ts";
import { oakify } from "../utils/oakify.ts";
import { createAbsence, getByUserId } from "../controllers/absences.ts";

export const absenceRouter = new Router({
  prefix: "/api/absences",
});

absenceRouter.get("/:user_id", oakify(getByUserId));
absenceRouter.post("/:user_id", oakify(createAbsence));
