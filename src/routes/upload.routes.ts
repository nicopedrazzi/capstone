import { Router } from "express";

const uploadRouter = Router();

uploadRouter.get("/health", (_req, res) => {
  res.json({ ok: true, scope: "auth" });
});


export default uploadRouter;