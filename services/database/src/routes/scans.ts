import {
  absenceScanController,
  allAbsenceScanController,
  getAbsenceScan,
} from "../controllers/absence-scan.ts";
import { Router } from "../deps.ts";
import { oakify } from "../utils/oakify.ts";

export const scanRouter = new Router({
  prefix: "/api/absence-scan",
});

scanRouter.get("/:scan_id", oakify(absenceScanController));
scanRouter.get("/", oakify(allAbsenceScanController));
