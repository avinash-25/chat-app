import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  let existingUser = User.find(username);
});

export const loginUser = asyncHandler(async (req, res) => {
  // Login logic will go here
  res.status(200).json({ message: "User logged in successfully" });
});
