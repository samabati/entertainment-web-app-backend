import { Router } from "express";
import { signUp, login, verifyToken } from "../controllers/auth";
import { errorHandler } from "../errorHandler";
import { authMiddleware } from "../middleware/authMiddleware";

const authRouter: Router = Router();

authRouter.post("/signup", errorHandler(signUp));
authRouter.post("/login", errorHandler(login));
authRouter.get("/verify", [authMiddleware], errorHandler(verifyToken));

export default authRouter;
