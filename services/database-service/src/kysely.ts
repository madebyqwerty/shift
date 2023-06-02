import {
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from "./deps.ts";
import { PostgresDriver } from "./postgres-driver.ts";
import { Pool } from "./deps.ts";
import { DB } from "../kysely/types.ts";

const pool = new Pool(
  {
    user: "postgres",
    database: "postgres",
    hostname: "172.17.0.1",
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
