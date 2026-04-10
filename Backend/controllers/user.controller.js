import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

//* Get single user
export const getCurrentUser = asyncHandler(async (req, res) => {
  let userId = req.userId;

  let user = await User.findById(userId).select("-password");
  if (!user)
    res.status(400).json({
      message: "User not found",
    });

  res.status(200).json({
    user: user,
  });
});

//*
