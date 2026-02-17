"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.get("/health", (_req, res) => {
    res.json({ ok: true, scope: "auth" });
});
authRouter.post("/register", auth_controller_1.registerHandler);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map