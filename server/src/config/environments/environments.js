import dotenv from "dotenv";
dotenv.config();

export const environements = {
  port: process.env.PORT || 8080,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  corsOrigin: process.env.CORS_ORIGIN,
  saltRounds: process.env.SALT_ROUNDS || 2,
};
