import { NextFunction, Response } from "express";
import { Result, ValidationError } from "express-validator";

export class CustomError {
  status: number;
  errors: string[];

  constructor(errors: string[], status: number) {
    this.errors = errors;
    this.status = status;
  }
}

class ErrorResponse {
  private next: NextFunction;

  constructor(next: NextFunction) {
    this.next = next;
  }

  badRequest(x: string[] | Result<ValidationError>) {
    if (x instanceof Result) {
      const errors = x.array().map((error) => error.msg) as string[];

      this.next(new CustomError(errors, 400));
    } else {
      this.next(new CustomError(x, 400));
    }
  }

  unauthorized(errors: string[]) {
    this.next(new CustomError(errors, 401));
  }

  forbidden(errors: string[]) {
    this.next(new CustomError(errors, 403));
  }

  notFound(errors: string[]) {
    this.next(new CustomError(errors, 404));
  }

  internalServerError(errors: string[]) {
    this.next(new CustomError(errors, 500));
  }

  notImplemented(errors: string[]) {
    this.next(new CustomError(errors, 501));
  }

  serviceUnavailable(errors: string[]) {
    this.next(new CustomError(errors, 503));
  }

  tooManyRequests(errors: string[]) {
    this.next(new CustomError(errors, 429));
  }
}

class SuccessResponse {
  public res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  created(message: string, data: any) {
    this.res.status(201).send({ message, data });
  }
}

export default class ApiResponse {
  private res: Response;
  private next: NextFunction;
  public success: SuccessResponse;
  public error: ErrorResponse;

  constructor(res: Response, next: NextFunction) {
    this.res = res;
    this.next = next;
    this.success = new SuccessResponse(this.res);
    this.error = new ErrorResponse(this.next);
  }
}
