import { ok, strictEqual, deepStrictEqual } from "node:assert";
import roster from "./roster.js";

ok(Array.isArray(roster) && roster.length >= 1, "roster must be a non-empty array");
for (const person of roster) {
  strictEqual(typeof person.name, "string", "each entry needs a name");
  strictEqual(typeof person.role, "string", "each entry needs a role");
}
// The team convention is: keep the roster alphabetical by name.
const names = roster.map((p) => p.name);
const sorted = [...names].sort();
deepStrictEqual(names, sorted, "roster must stay alphabetical by name");

console.log("All tests passed ✅");
