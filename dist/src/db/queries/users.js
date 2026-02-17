"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = addUser;
const __1 = require("..");
const schema_1 = require("../schema");
async function addUser(user) {
    const [addedUser] = await __1.db.insert(schema_1.users).values(user).returning();
    return addedUser;
}
;
//# sourceMappingURL=users.js.map