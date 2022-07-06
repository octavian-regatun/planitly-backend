import { NextFunction, Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import ApiResponse from "../lib/apiResponse";
import {
  eventsGetSchema,
  eventsPostSchema,
} from "../lib/inputSchemas/eventsSchema";
import db from "../lib/prisma";

const eventsRouter = Router();

interface Body {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  fullDay: boolean;
  authorId: string;
  participantIds?: string[];
  locationId?: number;
  color?: string;
}

eventsRouter.get(
  "/",
  checkSchema(eventsGetSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const apiResponse = new ApiResponse(res, next);

    const result = validationResult(req);

    if (!result.isEmpty()) {
      apiResponse.error.badRequest(result);
      return;
    }

    try {
      const events = await db.event.findMany({
        where: {
          OR: [{ authorId: req.id! }, { participantIds: { has: req.id } }],
        },
      });

      res.send(events);
    } catch (e: any) {
      apiResponse.error.internalServerError([e.message]);
    }
  }
);

eventsRouter.post(
  "/",
  checkSchema(eventsPostSchema),
  async (req: Request, res: Response, next: NextFunction) => {
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

    const apiResponse = new ApiResponse(res, next);

    const result = validationResult(req);

    if (!result.isEmpty()) {
      apiResponse.error.badRequest(result);
      return;
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

      apiResponse.success.created("event created", event);
    } catch (e: any) {
      apiResponse.error.internalServerError([e.message]);
    }
  }
);

eventsRouter.patch(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    
  }
);

export default eventsRouter;
