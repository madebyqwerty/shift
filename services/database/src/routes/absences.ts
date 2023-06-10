import { Router } from "../deps.ts";
import { oakify } from "../utils/oakify.ts";
import { createAbsence, getByUserId } from "../controllers/absences.ts";

export const absenceRouter = new Router({
  prefix: "/api/absences",
});

absenceRouter.get("/:userId", oakify(getByUserId));
absenceRouter.post("/:userId", oakify(createAbsence));
