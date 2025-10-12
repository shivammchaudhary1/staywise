import mongoose from "mongoose";
import { userModel, UserRole } from "../types/userModel.type.js";

const userScehma = new mongoose.Schema<userModel>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.User,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model<userModel>("User", userScehma);
export default User;
