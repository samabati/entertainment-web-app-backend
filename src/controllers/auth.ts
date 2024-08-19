import { Request, Response } from "express";
import { LoginSchema, SignupSchema } from "../schema/auth";
import { prismaClient } from "../server";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";

export const signUp = async (req: Request, res: Response) => {
  SignupSchema.parse(req.body);

  const exists = await prismaClient.user.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (exists) {
    throw new BadRequestException(
      "User elready exists",
      ErrorCode.USER_ALREADY_EXISTS
    );
  }

  const hashPw = await bcrypt.hash(req.body.password, 10);

  const user = await prismaClient.user.create({
    data: {
      email: req.body.email,
      password: hashPw,
    },
  });

  const token = jwt.sign(req.body.email, JWT_SECRET!);

  res.status(200).json({ user, token });
};

export const login = async (req: Request, res: Response) => {
  LoginSchema.parse(req.body);

  const user = await prismaClient.user.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    throw new BadRequestException(
      "User does not exist!",
      ErrorCode.USER_ALREADY_EXISTS
    );
  }

  const pwMatch = await bcrypt.compare(req.body.password, user.password);

  if (!pwMatch) {
    throw new BadRequestException(
      "Password does not match!",
      ErrorCode.INVALID_PASSWORD
    );
  }

  const token = jwt.sign(user.email, JWT_SECRET!);

  res.status(200).json({ user: { id: user.id, email: user.email }, token });
};

export const verifyToken = async (req: Request, res: Response) => {
  res.status(200).json(req.user);
};
