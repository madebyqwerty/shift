export const port = Number(Deno.env.get("PORT")) || 5000;
export const serverURL = `http://localhost:${port}/api`;
