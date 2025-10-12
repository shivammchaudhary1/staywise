import dotenv from "dotenv";
import type { Environments } from "../../types/environments.types.js";
dotenv.config();

export const environments: Environments = {
  port: Number(process.env.PORT),
  mongoURI: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  corsOrigin: process.env.CORS_ORIGIN as string,
  saltRound: Number(process.env.SALT_ROUNDS) || 2,
  expiresIn: process.env.EXPIRES_IN || "7d",
};
