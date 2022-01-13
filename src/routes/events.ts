import { Router } from "express";
import db from "../lib/prisma";

const eventsRouter = Router();

interface Body {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  fullDay?: boolean;
  authorId?: string;
  participantIds?: string[];
  locationId?: number;
  color?: string;
}

eventsRouter.post("/", (req, res) => {
  (async () => {
    const {
      title,
      description,
      startDate,
      endDate,
      fullDay,
      authorId,
      participantIds,
      locationId,
      color,
    }: Body = req.body;

    if (
      !title ||
      !startDate ||
      !endDate ||
      !authorId ||
      fullDay === undefined ||
      !locationId
    ) {
      return res.sendStatus(400);
    }

    try {
      const event = await db.event.create({
        data: {
          title,
          description,
          startDate,
          endDate,
          fullDay,
          authorId,
          participantIds,
          locationId,
          color,
        },
      });

      return res.status(201).send(event);
    } catch (e) {
      console.log(e);
    }

    return res.sendStatus(200);
  })();
});

export default eventsRouter;
