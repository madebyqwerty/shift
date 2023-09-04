import { db } from "../kysely.ts";

export type AbsenceScan = {
  scan_id: string;
  absences: Array<{
    id: string;
    absence: number;
    date: string;
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
