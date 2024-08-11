import { ErrorCode, HttpException } from "./root";

export class UnauthorizedException extends HttpException {
  message: string;
  constructor(message: string) {
    super(message, 401, ErrorCode.UNAUTHORIZED_USER, null);
    this.message = message;
  }
}
