"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegistration = userRegistration;
const users_1 = require("../db/queries/users");
const argon2_1 = require("argon2");
async function userRegistration(user, password) {
    const passwordHash = await (0, argon2_1.hash)(password);
    const created = await (0, users_1.addUser)({
        email: user.email,
        name: user.name,
        surname: user.surname,
        passwordHash,
    });
    if (!created) {
        throw new Error("Failed to create user");
    }
    return {
        id: created.id,
        email: created.email,
        name: created.name,
        surname: created.surname,
        createdAt: created.createdAt,
    };
}
//# sourceMappingURL=auth.service.js.map