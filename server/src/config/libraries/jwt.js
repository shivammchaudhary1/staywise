import jwt from "jsonwebtoken";
import { environments } from "../environments/environments";

const generateToken = async (payload) => {
  try {
    const token = await jwt.sign(payload, environments.jwtSecret, {
      expiresIn: environments.expiresIn,
    });
    return token;
  } catch (error) {
    console.error("Error creating JWT:", error);
  }
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, environments.jwtSecret);
    return decoded;
  } catch (error) {
    console.error("Error verifying JWT:", error);
    if (error.name === "TokenExpiredError") {
      throw new Error("Token has expired");
    }
    throw new Error("Invalid token");
  }
};

export { generateToken, verifyToken };
