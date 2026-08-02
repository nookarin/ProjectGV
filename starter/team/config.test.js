import { ok, strictEqual } from "node:assert";
import config from "./config.js";

strictEqual(typeof config.appName, "string", "appName must be a string");
ok(typeof config.maxUsers === "number" && config.maxUsers > 0, "maxUsers must be a positive number");
strictEqual(typeof config.theme, "string", "theme must be a string");

console.log("All tests passed ✅");
