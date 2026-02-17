"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("./db");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 8080);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/health", (_req, res) => {
    res.json({ ok: true });
});
app.get("/health/db", async (_req, res) => {
    const result = await db_1.db.execute((0, drizzle_orm_1.sql) `select 1 as ok`);
    res.json({ ok: result[0]?.ok === 1 });
});
app.use("/auth", auth_routes_1.default);
app.listen(port, () => console.log(`API on http://localhost:${port}`));
//# sourceMappingURL=index.js.map