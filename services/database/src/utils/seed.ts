import { db } from "../kysely.ts";
import { names } from "./names.ts";

export async function seed() {
  const users = names.map((v) => ({
    name: v,
  }));

  await db.insertInto("User").values(users).returningAll().execute();
}

await seed();
