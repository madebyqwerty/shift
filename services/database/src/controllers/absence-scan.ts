import { db } from "../kysely.ts";

export type AbsenceScan = {
  id: string;
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
      id: scan.id,
    })
    .returning("id")
    .executeTakeFirst();
