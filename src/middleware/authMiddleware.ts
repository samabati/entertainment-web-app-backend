import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/uanauthorized";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error();
    }

    const tokenWithoutBearer = token.split(" ")[1];

    const verifyToken = jwt.verify(tokenWithoutBearer, JWT_SECRET!);

    if (verifyToken) {
      next();
    } else {
      throw new Error();
    }
  } catch (err) {
    next(new UnauthorizedException("Unauthorized user"));
  }
};
