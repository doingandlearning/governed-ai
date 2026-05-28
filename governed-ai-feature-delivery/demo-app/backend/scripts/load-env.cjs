const path = require("node:path");
const dotenv = require("dotenv");

const envPath = path.resolve(process.cwd(), ".env");
const result = dotenv.config({ path: envPath });

if (result.error && result.error.code !== "ENOENT") {
  throw result.error;
}
