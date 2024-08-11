import dontenv from "dotenv";

dontenv.config({ path: "./.env" });

export const JWT_SECRET = process.env.JWT_SECRET;
