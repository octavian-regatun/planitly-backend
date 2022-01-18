import { NextFunction, Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import ApiResponse from "../lib/apiResponse";
import locationsPostSchema from "../lib/inputSchemas/locationsSchema";
import db from "../lib/prisma";

const locationsRouter = Router();

interface Body {
  name: string;
  lat?: number;
  lon?: number;
  authorId: string;
}

locationsRouter.post(
  "/",
  checkSchema(locationsPostSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, lat, lon, authorId }: Body = req.body;

    const apiResponse = new ApiResponse(res, next);

    const result = validationResult(req);

    if (!result.isEmpty()) {
      apiResponse.error.badRequest(result);
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

      apiResponse.success.created("location created", location);
    } catch (e: any) {
      apiResponse.error.internalServerError(e);
    }
  }
);

export default locationsRouter;
