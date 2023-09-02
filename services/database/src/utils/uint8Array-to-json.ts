import { Meta, log } from "../logger.ts";

export const uint8ArrayToJson: <T>(arr: Uint8Array) => T = (arr) => {
  const decoder = new TextDecoder();
  const decoded = decoder.decode(arr);
  try {
    return JSON.parse(decoded);
  } catch {
    log.error(`Failed to parse JSON: ${decoded}`, Meta.deno);
    return null;
  }
};
