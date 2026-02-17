import { Request, Response } from "express";
import { userRegistration } from "../services/auth.service";

export async function registerHandler(req: Request, res: Response) {
  try {
    const { email, name, surname, password } = req.body ?? {};

    if (!email || !name || !surname || !password) {
      return res.status(400).json({
        error: "email, name, surname and password are required",
      });
    }

    const createdUser = await userRegistration({ email, name, surname }, password);
    return res.status(201).json({
      message: "User successfully registered",
      user: createdUser,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error, try again";
    return res.status(400).json({ error: message });
  }
}
