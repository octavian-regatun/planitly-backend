import { Router } from "express";
import isAuthenticated from "../middleware/isAuthenticated";
import authRouter from "./auth";
import locationsRouter from "./locations";
import usersRouter from "./users";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", isAuthenticated, usersRouter);
router.use("/locations", isAuthenticated, locationsRouter);

router.get("/", (req, res) => {
  return res.sendStatus(200);
});

export default router;
