import { HttpException } from "../exceptions/root";
import { Request, Response, NextFunction } from "express";

export const exceptionMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
    error: error.error,
  });
};
