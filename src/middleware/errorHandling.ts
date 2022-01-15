import { NextFunction, Request, Response } from "express";
import { CustomError } from "../lib/apiResponse";

export default function errorHandling(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log(error);

  if (error.type) {
    switch (error.type) {
      case "entity.parse.failed":
        res.status(400).json(new CustomError(["invalid json"], 400));
        break;

      default:
        res.status(500).json(new CustomError(["unhandled error"], 500));
        break;
    }
  } else {
    switch (error.status) {
      case 500:
        res
          .status(error.status)
          .send(new CustomError(["internal server error"], 500));
        break;

      default:
        res.status(error.status).send(error);
        break;
    }
  }
}
