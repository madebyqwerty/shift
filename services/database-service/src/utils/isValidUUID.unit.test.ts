import { assert } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import { isValidUUID } from "./isValidUUID.ts";

Deno.test("allows valid UUID", () => {
  // list of 50 uuids
  const uuids = [
    "2975c978-3abe-4601-bc44-e49e234d915c",
    "ce26ceac-43ed-4881-bb5a-1ab879435ce0",
    "5ee2ee48-dce3-4824-b305-d8cf1cc4dca1",
    "62af8522-f593-11ed-b67e-0242ac120002",
    "e16c6723-50e8-4ba3-8ebe-9adf80c3fd1f",
    "d79e03e3-5b09-46fe-a7bd-7aed1e1d050e",
    "395160e5-ebc8-4826-b654-701c6cfb0194",
    "071a42d4-7fbf-49ce-9f59-1526546a03a5",
    "748946e7-afd2-41bc-9e4d-1e323e50a9d3",
    "21d51358-561c-42e8-b014-5f8187de6dce",
    "4118254f-a2de-443f-b40e-0ed243171535",
  ];

  uuids.forEach((uuid) => assert(isValidUUID(uuid)));
});

Deno.test("disallow invalid UUID", () => {
  const uuids = [
    "test",
    "233123232",
    "xdsdsdsdsd",
    "tohlebym-elov-ypad-atja-kovaliduuid",
    "2975c978-3abe-4601-bc44-e49e234d915c-2975c978-3abe-4601-bc44-e49e234d915c",
    "00000000-0000-0000-0000-00000000000",
  ];

  uuids.forEach((uuid) => assert(!isValidUUID(uuid)));
});
