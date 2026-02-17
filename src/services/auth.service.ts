import { addUser } from "../db/queries/users";
import { hash } from "argon2";

export type User = {
  email: string;
  name: string;
  surname: string;
};

export async function userRegistration(user: User, password: string) {
  const passwordHash = await hash(password);
  const created = await addUser({
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
