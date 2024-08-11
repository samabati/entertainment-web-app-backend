import { ZodError } from "zod";
import { HttpException } from "./exceptions/root";
import { Request, Response, NextFunction } from "express";
import { UnprocessableEntity } from "./exceptions/unprocessable-entity";
import { InternalException } from "./exceptions/internal";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (err) {
      let exception;
      if (err instanceof HttpException) {
        exception = err;
      } else if (err instanceof ZodError) {
        exception = new UnprocessableEntity(err.errors);
      } else {
        exception = new InternalException(err, 500);
      }
      next(exception);
    }
  };
};
