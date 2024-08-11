export class HttpException extends Error {
  message: string;
  statusCode: number;
  errorCode: ErrorCode;
  error: any;
  constructor(
    message: string,
    statusCode: number,
    errorCode: ErrorCode,
    error: any
  ) {
    super(message);
    this.message = message;
    (this.statusCode = statusCode),
      (this.errorCode = errorCode),
      (this.error = error);
  }
}

export enum ErrorCode {
  USER_ALREADY_EXISTS = 10001,
  UNPROCESSABLE_ENTTIY = 10002,
  INTERNAL_SERVER_ERROR = 10003,
  USER_DOES_NOT_EXIST = 10004,
  INVALID_PASSWORD = 10005,
  UNAUTHORIZED_USER = 10006,
}
