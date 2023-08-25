import { db } from "../kysely.ts";

export type AbsenceScan = {
  id: string;
  data: Array<{
    id: string;
    absence: number;
    date: string;
  }>;
};

export const createAbsenceScan = async (scan: AbsenceScan) =>
  await db
    .insertInto("AbsenceScan")
    .values({
      absences: JSON.stringify(scan.data),
      id: scan.id,
    })
    .returning("id")
    .executeTakeFirst();
