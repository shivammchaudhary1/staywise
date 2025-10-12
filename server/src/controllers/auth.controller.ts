import User from "../models/user.model.js";
import { generateToken } from "../config/libraries/jwt.js";
import { hashPassword, comparePassword } from "../config/libraries/bcrypt.js";
import { Request, Response } from "express";
import { UserRole } from "../types/userModel.type.js";

export const register = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    console.log("Register endpoint reached!");
    const { name, email, password, role } = req.body;

    // console.log(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false, token: null });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role ? role : UserRole.User,
    });
    await newUser.save();

    // Generate token
    const token = await generateToken({
      userId: newUser._id.toString(),
      role: newUser.role,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", success: true, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, token: null });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false, token: null });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false, token: null });
    }

    // console.log("User authenticated successfully:", user);

    // Generate token
    const token = await generateToken({
      userId: user._id.toString(),
      role: user.role,
    });

    return res
      .status(200)
      .json({ message: "Login successful", success: true, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false, token: null });
  }
};
