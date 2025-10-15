import Property from "../models/property.model.js";
import { Request, Response } from "express";
import { TokenPayload } from "../types/tokenPayload.types.js";

// Define the RequestWithUser interface to access user data
interface RequestWithUser extends Request {
  user?: TokenPayload;
}

export const createProperty = async (
  req: RequestWithUser,
  res: Response
): Promise<Response | void> => {
  try {
    const { title, description, pricePerNight, location, images } = req.body;

    if (!title || !description || !pricePerNight || !location) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Extract userId from req.user
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "User ID not found. Authentication required.",
        success: false,
      });
    }

    const newProperty = new Property({
      title,
      description,
      pricePerNight,
      location,
      images,
      userId, // Set the property owner to the authenticated user
    });

    await newProperty.save();

    return res.status(201).json({
      message: "Property created successfully",
      success: true,
      property: newProperty,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message || "Unknown error occurred",
    });
  }
};

export const getAllProperties = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Search functionality with regex
    const search = req.query.search as string;
    const sortByPrice = req.query.sortByPrice as string;

    // Build query object for filtering
    let query: any = {};

    // Add search functionality using regex
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i"); // Case-insensitive regex
      query.$or = [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { "location.city": { $regex: searchRegex } },
        { "location.state": { $regex: searchRegex } },
        { "location.country": { $regex: searchRegex } },
        { "location.address": { $regex: searchRegex } },
      ];
    }

    // Build sort object
    let sortObject: any = { createdAt: -1 }; // Default sort by newest first

    // Only support price sorting
    if (sortByPrice === "asc") {
      sortObject = { pricePerNight: 1 }; // Low to High
    } else if (sortByPrice === "desc") {
      sortObject = { pricePerNight: -1 }; // High to Low
    }

    // Count total properties matching the query
    const totalProperties = await Property.countDocuments(query);
    const totalPages = Math.ceil(totalProperties / limit);

    // Fetch properties with filtering, sorting, and pagination
    const properties = await Property.find(query)
      .sort(sortObject)
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      pagination: {
        currentPage: page,
        totalPages,
        totalProperties,
        perPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      filters: {
        search: search || "",
        sortByPrice: sortByPrice || "",
      },
      message: "Properties retrieved successfully",
      success: true,
      properties,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message || "Unknown error occurred",
    });
  }
};

export const getPropertyById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const propertyId = req.params.propertyId;
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        message: "Property not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Property retrieved successfully",
      success: true,
      property,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message || "Unknown error occurred",
    });
  }
};

export const updateProperty = async (
  req: RequestWithUser,
  res: Response
): Promise<Response | void> => {
  try {
    const propertyId = req.params.propertyId;
    const { title, description, pricePerNight, location, images } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "User ID not found. Authentication required.",
        success: false,
      });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      {
        title,
        description,
        pricePerNight,
        location,
        images,
        userId,
      },
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({
        message: "Property not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Property updated successfully",
      success: true,
      property: updatedProperty,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message || "Unknown error occurred",
    });
  }
};

export const deleteProperty = async (
  req: RequestWithUser,
  res: Response
): Promise<Response | void> => {
  try {
    const propertyId = req.params.propertyId;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "User ID not found. Authentication required.",
        success: false,
      });
    }

    const deletedProperty = await Property.findByIdAndDelete(propertyId);

    if (!deletedProperty) {
      return res.status(404).json({
        message: "Property not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Property deleted successfully",
      success: true,
      property: deletedProperty,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message || "Unknown error occurred",
    });
  }
};
