import { db } from "../kysely.ts";
import { Meta, log } from "../logger.ts";
import { Controller, error } from "../utils/oakify.ts";
import { success } from "../utils/oakify.ts";

export type AbsenceScan = {
  scan_id: string;
  absences: Array<{
    absence_id: string;
    user_id: string;
    absence: number;
    date: string;
    name: string;
  }>;
};

export const createAbsenceScan = async (scan: AbsenceScan) =>
  await db
    .insertInto("AbsenceScan")
    .values({
      absences: JSON.stringify(scan.absences),
      id: scan.scan_id,
    })
    .returning("id")
    .executeTakeFirst();

export const getAbsenceScan = async (id: string) =>
  (await db
    .selectFrom("AbsenceScan")
    .selectAll()
    .where("AbsenceScan.id", "=", id)
    .executeTakeFirst()) ?? {};

export const getAllAbsenceScans = async () =>
  await db.selectFrom("AbsenceScan").selectAll().execute();

export const absenceScanController: Controller<"/:scan_id"> = async (ctx) => {
  const { scan_id } = ctx.params;

  return await getAbsenceScan(scan_id)
    .then(success)
    .catch((e) => {
      log.debug("Failed to fetch absence scan" + e, Meta.db);
      return error({ absence: ["failed-to-fetch-absence"] });
    });
};

export const allAbsenceScanController: Controller<"/"> = async () => {
  return await getAllAbsenceScans()
    .then(success)
    .catch((e) => {
      log.debug("Failed to fetch absence scan" + e, Meta.db);
      return error({ absence: ["failed-to-fetch-absence"] });
    });
};
