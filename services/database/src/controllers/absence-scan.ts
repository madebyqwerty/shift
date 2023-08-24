import { db } from "../kysely.ts";

export type AbsenceScan = {
  id: string;
  absence: number;
  date: string;
};

export const createAbsenceScan = async (absences: AbsenceScan[]) =>
  await db
    .insertInto("AbsenceScan")
    .values({
      absences: JSON.stringify(absences),
    })
    .returning("id")
    .executeTakeFirst();
