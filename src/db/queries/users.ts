import { db } from "..";
import { users, Newuser } from "../schema";

export async function addUser(user:Newuser){
    const [addedUser] = await db.insert(users).values(user).returning();
    return addedUser;
};
