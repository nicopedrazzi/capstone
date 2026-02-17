"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHandler = registerHandler;
const auth_service_1 = require("../services/auth.service");
async function registerHandler(req, res) {
    try {
        const { email, name, surname, password } = req.body ?? {};
        if (!email || !name || !surname || !password) {
            return res.status(400).json({
                error: "email, name, surname and password are required",
            });
        }
        const createdUser = await (0, auth_service_1.userRegistration)({ email, name, surname }, password);
        return res.status(201).json({
            message: "User successfully registered",
            user: createdUser,
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error, try again";
        return res.status(400).json({ error: message });
    }
}
//# sourceMappingURL=auth.controller.js.map