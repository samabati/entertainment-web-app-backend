import { ErrorCode, HttpException } from "./root";

export class InternalException extends HttpException {
  error: any;
  statusCode: number;
  constructor(error: any, statusCode: number) {
    super(
      "Something went wrong...",
      statusCode,
      ErrorCode.INTERNAL_SERVER_ERROR,
      error
    );
    this.error = error;
    this.statusCode = statusCode;
  }
}
