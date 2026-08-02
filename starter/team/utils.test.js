import { strictEqual } from "node:assert";
import * as utils from "./utils.js";

// capitalize is always expected.
strictEqual(utils.capitalize("hello"), "Hello");

// shout / whisper are added during the add/add exercise. Test them only once
// they exist, so `main` stays green at every intermediate step.
if (utils.shout) {
  strictEqual(utils.shout("hello"), "HELLO");
}
if (utils.whisper) {
  strictEqual(utils.whisper("HELLO"), "hello");
}

console.log("All tests passed ✅");
