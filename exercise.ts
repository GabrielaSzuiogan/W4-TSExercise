// Goal: Implement a function that takes a JSON string and returns either a valid User object or a friendly error.

type Role = "intern" | "mentor" | "admin";

export type User = {
  id: string;
  email: string;
  role: Role;
};

export type Result<T> = { ok: true; value: T } | { ok: false; error: string };

// [1] Implement
// It must:
// 1. Return { ok:false, error: "Invalid JSON" } if the string is not valid JSON
// 2. Return { ok:false, error: "Invalid User shape" } if if JSON is valid but not a valid User
// 3. Return { ok:true, value: user } if everything is valid
// Rules:
// Don’t use any
// Don’t use as User / as any to force the type
// The result must be correct based on runtime checks
export function parseUserConfig(input: string): Result<User> {
  let parsedInput = JSON.parse(input);
  if (!parsedInput) {
    return { ok: false, error: "Invalid JSON" };
  }

  if (parsedInput === null || typeof parsedInput !== "object") {
    return { ok: false, error: "Invalid User shape" };
  }

  if (!("id" in parsedInput) || typeof parsedInput["id"] !== "string") {
    return { ok: false, error: "Invalid User shape" };
  }

  if (!("email" in parsedInput) || typeof parsedInput["email"] !== "string") {
    return { ok: false, error: "Invalid User shape" };
  }

  if (
    !("role" in parsedInput) ||
    (parsedInput["role"] !== "intern" &&
      parsedInput["role"] !== "mentor" &&
      parsedInput["role"] !== "admin")
  ) {
    return { ok: false, error: "Invalid User shape" };
  }

  return {
    ok: true,
    value: {
      id: parsedInput["id"],
      email: parsedInput["email"],
      role: parsedInput["role"],
    },
  };
}

// Sample input (for testing)
const inputs = [
  `{"id":"u1","email":"a@b.com","role":"intern"}`, // ok
  `{"id":"u2","email":"a@b.com","role":"boss"}`, // shape error
  `{"id":123,"email":"a@b.com","role":"intern"}`, // shape error
];

for (const i of inputs) {
  console.log(parseUserConfig(i));
}

// [2] Parse list of users
// Implement
// Rules:
// JSON must be an array
// Every element must be a valid User
// If JSON is invalid -> "Invalid JSON"
// If JSON is valid but not an array or any element is invalid -> "Invalid Users shape"
export function parseUsersConfig(input: string): Result<User[]> {
  let parsedInp = JSON.parse(input);

  if (!parsedInp) {
    return { ok: false, error: "Invalid JSON" };
  }

  if (!Array.isArray(parsedInp)) {
    return { ok: false, error: "Invalid User shape" };
  }

  const usersAux: User[] = [];

  for (const item of parsedInp) {
    if (typeof item !== "object" || item === null) {
      return { ok: false, error: "Invalid User shape" };
    }

    if (!("id" in item) || typeof item["id"] !== "string") {
      return { ok: false, error: "Invalid User shape" };
    }

    if (!("email" in item) || typeof item["email"] !== "string") {
      return { ok: false, error: "Invalid User shape" };
    }

    if (
      !("role" in item) ||
      (item["role"] !== "intern" &&
        item["role"] !== "mentor" &&
        item["role"] !== "admin")
    ) {
      return { ok: false, error: "Invalid User shape" };
    }

    usersAux.push({ id: item["id"], email: item["email"], role: item["role"] });
  }
  return {
    ok: true,
    value: usersAux,
  };
}

// [3] Better error messages (advanced)
// Improve errors so they are more specific than "Invalid User shape".
// Examples:
// "Missing field: id"
// "Invalid type for id (expected string)"
// "Invalid role (expected intern|mentor|admin)"
