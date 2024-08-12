import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/uanauthorized";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "../server";

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

    const payload = jwt.verify(tokenWithoutBearer, JWT_SECRET!);

    if (!payload) throw new Error();

    const user = await prismaClient.user.findFirst({
      where: {
        email: payload.toString(),
      },
    });

    if (!user) throw new Error();

    req.user = user;

    next();
  } catch (err) {
    next(new UnauthorizedException("Unauthorized user"));
  }
};
