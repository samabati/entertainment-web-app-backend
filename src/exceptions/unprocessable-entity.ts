import { ErrorCode, HttpException } from "./root";

export class UnprocessableEntity extends HttpException {
  error: any;
  constructor(error: any) {
    super("Unprocessable entity", 403, ErrorCode.UNPROCESSABLE_ENTTIY, error);
    this.error = error;
  }
}
