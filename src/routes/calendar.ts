import { NextFunction, Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import ApiResponse from "../lib/apiResponse";
import { generateCalendar } from "../lib/calendar";
import calendarGetSchema from "../lib/inputSchemas/calendarSchema";

const calendarRouter = Router();

interface Params {
  month: number;
  year: number;
}

calendarRouter.get(
  "/month/:month/year/:year",
  checkSchema(calendarGetSchema),
  async (req: Request<Params>, res: Response, next: NextFunction) => {
    const { month, year } = req.params;
    const apiResponse = new ApiResponse(res, next);

    const result = validationResult(req);

    if (!result.isEmpty()) {
      apiResponse.error.badRequest(result);
      return;
    }

    res.send(generateCalendar(month - 1, year));
  }
);

export default calendarRouter;
