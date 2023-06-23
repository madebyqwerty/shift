import {
  assertEquals,
  assert,
} from "https://deno.land/std@0.160.0/testing/asserts.ts";
import { isValidUUID } from "../../utils/isValidUUID.ts";
import { serverURL } from "../../constants.ts";

const endpoint = `${serverURL}/users`;

const validateSchema = (user: Record<string, unknown>) => {
  assert(typeof user.id === "string");
  assert(isValidUUID(user.id));
  assert(typeof user.name === "string");
  assert(Object.keys(user).includes("name"));
  assert(Object.keys(user).includes("id"));
};

Deno.test("Should create an user", async () => {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Tomáš Kebrle",
    }),
  });

  assertEquals(res.status, 200);
  const user = await res.json();
  assertEquals(user.name, "Tomáš Kebrle");
  validateSchema(user);
});

Deno.test("Should not create a user", async () => {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  assertEquals(res.status, 400);
  const user = await res.json();

  assertEquals(user.errors.name, ["required"]);
});

Deno.test("Should get all users", async () => {
  const res = await fetch(endpoint);

  assertEquals(res.status, 200);

  const users = await res.json();

  assert(Array.isArray(users));
  assert(users.length > 0);

  users.forEach(validateSchema);
});

Deno.test("Should get a user by id", async () => {
  const res = await fetch(endpoint);

  assertEquals(res.status, 200);

  const [user] = await res.json();

  const res2 = await fetch(`${endpoint}/${user.id}`);

  assertEquals(res2.status, 200);

  const user2 = await res2.json();

  assertEquals(user2.id, user.id);
  assertEquals(user2.name, user.name);
  validateSchema(user2);
});

Deno.test(
  "Should not get a user by id because the id is not valid",
  async () => {
    const res = await fetch(`${endpoint}/test`);

    assertEquals(res.status, 400);

    const user = await res.json();

    assertEquals(user.errors.id, ["not-valid"]);
  }
);

Deno.test(
  "Should not get a user by id because the user does not exist",
  async () => {
    const res = await fetch(`${endpoint}/c2437020-f661-4403-a230-5d8afe0f30ce`);

    assertEquals(res.status, 404);
    const user = await res.json();

    assertEquals(user.errors.user, ["not-found"]);
  }
);
