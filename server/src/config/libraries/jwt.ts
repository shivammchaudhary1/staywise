import jwt from "jsonwebtoken";
import { environments } from "../environments/environment.js";
import { TokenPayload } from "../../types/tokenPayload.types.js";

export const generateToken = async (
  payload: TokenPayload
): Promise<string | undefined> => {
  try {
    const token = await jwt.sign(
      payload,
      environments.jwtSecret as jwt.Secret,
      {
        expiresIn: environments.expiresIn,
      } as jwt.SignOptions
    );
    return token;
  } catch (error) {
    console.error("Error creating JWT:", error);
    throw new Error("Token generation failed");
  }
};

export const verifyToken = async (token: string): Promise<TokenPayload> => {
  try {
    const decoded = (await jwt.verify(
      token,
      environments.jwtSecret
    )) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error("Error verifying JWT:", error);
    if (error instanceof Error && error.name === "TokenExpiredError") {
      throw new Error("Token has expired");
    }
    throw new Error("Invalid token");
  }
};
