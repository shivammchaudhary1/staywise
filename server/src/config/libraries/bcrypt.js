import bcrypt from "bcrypt";
import { environments } from "../environments/environments.js";

const hashPassword = async (password, saltRounds = environments.saltRounds) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Password encryption failed");
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Password comparison failed");
  }
};

export { hashPassword, comparePassword };
