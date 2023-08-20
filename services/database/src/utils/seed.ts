import { db } from "../kysely.ts";
import { names } from "./names.ts";
import { faker } from "../deps.ts";

export async function seed() {
  const users = names.map((v) => ({
    name: v,
  }));

    db.insertInto("Absence").values(absences).execute();
  });
}

await seed();
