import { Router } from "express";
import { signUp, login, protectedRoute } from "../controllers/auth";
import { errorHandler } from "../errorHandler";
import { authMiddleware } from "../middleware/authMiddleware";

const authRouter: Router = Router();

authRouter.post("/signup", errorHandler(signUp));
authRouter.post("/login", errorHandler(login));
authRouter.get("/protected", [authMiddleware], errorHandler(protectedRoute));

export default authRouter;
