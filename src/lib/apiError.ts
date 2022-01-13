export class ApiError {
  message: string;
  status: number;

  constructor(message: string, status: number) {
    this.message = message;
    this.status = status;
  }

  static badRequest(message: string): ApiError {
    return new ApiError(message, 400);
  }

  static unauthorized(message: string): ApiError {
    return new ApiError(message, 401);
  }

  static forbidden(message: string): ApiError {
    return new ApiError(message, 403);
  }

  static notFound(message: string): ApiError {
    return new ApiError(message, 404);
  }

  static internalServerError(message: string): ApiError {
    return new ApiError(message, 500);
  }

  static notImplemented(message: string): ApiError {
    return new ApiError(message, 501);
  }

  static serviceUnavailable(message: string): ApiError {
    return new ApiError(message, 503);
  }
}
