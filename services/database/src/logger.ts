import { ConsoleStream, Logger } from "https://deno.land/x/optic@1.3.9/mod.ts";
import { TokenReplacer } from "https://deno.land/x/optic@1.3.9/formatters/mod.ts";

export const log = new Logger();

log.addStream(
  new ConsoleStream().withFormat(
    new TokenReplacer()
      .withFormat("[{level} {dateTime}] {metadata} > {msg} ")
      .withDateTimeFormat("YY/MM/DD hh:mm:ss")
      .withLevelPadding(4)
      .withColor()
  )
);

export enum Meta {
  rabbit = "🐰 RabbitMQ",
  db = "🐘 Postgres",
  oak = "🌳 Oak",
}
