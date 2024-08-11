import { ErrorCode, HttpException } from "./root";

export class BadRequestException extends HttpException {
  message: string;
  errorCode: ErrorCode;
  constructor(message: string, errorCode: ErrorCode) {
    super(message, 400, errorCode, null);
    this.message = message;
    this.errorCode = errorCode;
  }
}
