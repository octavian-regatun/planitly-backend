import cors from "cors";
import express, { Router } from "express";
import errorHandling from "../middleware/errorHandling";
import isAuthenticated from "../middleware/isAuthenticated";
import authRouter from "./auth";
import calendarRouter from "./calendar";
import eventsRouter from "./events";
import locationsRouter from "./locations";
import usersRouter from "./users";

const router = Router();

router.use(cors());

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use("/auth", authRouter);
router.use("/users", isAuthenticated, usersRouter);
router.use("/locations", isAuthenticated, locationsRouter);
router.use("/events", isAuthenticated, eventsRouter);
router.use("/calendar", isAuthenticated, calendarRouter);

router.get("/", (req, res) => {
  return res.sendStatus(200);
});

router.use(errorHandling);

export default router;
