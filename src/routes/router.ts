import { Router } from "express";
import isAuthenticated from "../middleware/isAuthenticated";
import authRouter from "./auth";
import eventsRouter from "./events";
import locationsRouter from "./locations";
import usersRouter from "./users";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", isAuthenticated, usersRouter);
router.use("/locations", isAuthenticated, locationsRouter);
router.use("/events", isAuthenticated, eventsRouter);

router.get("/", (req, res) => {
  return res.sendStatus(200);
});

export default router;
