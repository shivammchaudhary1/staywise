import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/libraries/jwt.js";
import { TokenPayload } from "../types/tokenPayload.types.js";
import { UserRole } from "../types/userModel.type.js";

// Create a custom request interface that extends the original one
interface RequestWithUser extends Request {
  user?: TokenPayload;
}

export const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log("Token from header:", token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    try {
      // Verify token - handle as async
      const decoded = (await verifyToken(token)) as TokenPayload;

      //   console.log("Decoded token payload:", decoded);
      // Store the decoded payload in req.user
      req.user = decoded;
      //   console.log("req.user in authMiddleware:", req.user);
      next();
    } catch (error: any) {
      if (error.message === "Token has expired") {
        return res.status(403).json({
          success: false,
          message: "Token has expired. Please login again.",
          isExpired: true,
        });
      }

      return res.status(403).json({
        success: false,
        message: "Invalid token. Please login again.",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error authenticating user",
    });
  }
};

export const roleMiddleware =
  () => (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role;
      console.log("User role from token:", userRole);
      if (!userRole || userRole !== UserRole.Admin) {
        return res.status(403).json({
          message: "Admin access required for this resource",
          success: false,
        });
      }
      next();
    } catch (error) {
      console.error("Error in roleMiddleware:", error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
