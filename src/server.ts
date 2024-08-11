import express, { Request, Response, Express } from "express";
import { PrismaClient } from "@prisma/client";
import rootRouter from "./routes/root";
import { exceptionMiddleware } from "./middleware/exceptionMiddleware";
import cors from "cors";

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET,POST",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/v1", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.use(exceptionMiddleware);

app.listen(3000, () => console.log("App is running on port 3000"));
