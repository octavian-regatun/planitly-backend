import { Router } from "express";
import db from "../lib/prisma";

const locationsRouter = Router();

interface Body {
  name?: string;
  lat?: number;
  lon?: number;
  authorId?: string;
}

locationsRouter.post("/", (req, res) => {
  (async () => {
    const { name, lat, lon, authorId }: Body = req.body;

    if (!name || lat === undefined || lon === undefined || !authorId) {
      return res.sendStatus(400);
    }

    try {
      const location = await db.location.create({
        data: {
          name,
          lat,
          lon,
          authorId,
        },
      });
      return res.status(201).send(location);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  })();
});

export default locationsRouter;
