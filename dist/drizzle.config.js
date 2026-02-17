"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config.js");
const drizzle_kit_1 = require("drizzle-kit");
if (!process.env.DB_URL) {
    throw new Error("DB_URL is not set");
}
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DB_URL,
    },
});
//# sourceMappingURL=drizzle.config.js.map