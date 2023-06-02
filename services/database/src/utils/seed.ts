import { db } from "../kysely.ts";
import { faker } from "../deps.ts";

export async function seed() {
  const users = Array(30)
    .fill(undefined)
    .map((v) => ({
      name: faker.name.findName(),
    }));

  const dbUsers = await db
    .insertInto("User")
    .values(users)
    .returningAll()
    .execute();

  dbUsers.map((user) => {
    const absences = Array(10)
      .fill(undefined)
      .map((v) => ({
        userId: user.id,
        date: faker.date.between("2020-01-01", "2020-12-31"),
        lesson: faker.random.number(10),
      }));

    db.insertInto("Absence").values(absences).execute();
  });
}

await seed();
