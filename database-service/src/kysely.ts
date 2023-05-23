import {
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from "https://esm.sh/kysely@0.24.2";
import { PostgresDriver } from "./postgres-driver.ts";
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { DB } from "../kysely/types.ts";

const pool = new Pool(
  {
    user: "postgres",
    database: "postgres",
    hostname: "localhost",
    password: "postgres",
    port: 5432,
  },
  1
);

export const db = new Kysely<DB>({
  dialect: {
    createAdapter() {
      return new PostgresAdapter();
    },
    createDriver() {
      return new PostgresDriver({
        pool,
      });
    },
    createIntrospector(db: Kysely<unknown>) {
      return new PostgresIntrospector(db);
    },
    createQueryCompiler() {
      return new PostgresQueryCompiler();
    },
  },
});
