import { db } from "../kysely.ts";

export async function seed() {
  const users = [
    "Auský Jan",
    "Drbohlavová Lenka",
    "Frolík Josef",
    "Haunerová Magdaléna",
    "Hausnerová Daniela",
    "Horčička Vojtěch",
    "Hořejší Tomáš",
    "Jedličková Ellen",
    "Kebrle Tomáš",
    "Kernerová Eva",
    "Krylová Linda",
    "Kusá Adéla",
    "Laubeová Kateřina",
    "Matějková Emma Alžběta",
    "Mytskanyuk Evelína",
    "Parma Václav",
    "Petrusová Magdaléna",
    "Ransdorf Daniel",
    "Sobotková Simona",
    "Soukup Tadeáš",
    "Srbek David",
    "Srbek Matěj",
    "Šedivá Mája",
    "Thiebaut Marc",
    "Trubačová Lucie",
    "Vitmayerová Alexandra",
    "Volek Petr",
    "Witošová Eliška",
    "Zeman Jan",
    "Zouharová Magdaléna",
  ].map((v) => ({
    name: v,
  }));

  await db.insertInto("User").values(users).returningAll().execute();
}

await seed();
