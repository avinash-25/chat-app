import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { generateAccessToken } from "../config/token.config.js";
import { compare } from "bcryptjs";

//^ register user
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  let existingUser = await User.findOne({ username });

  if (existingUser)
    return res.status(400).json({ message: "User already exist" });

  let assessToken = generateAccessToken(User._id);
  res.cookie("accessToken", assessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 1000 * 60 * 15, // 15 minutes in milliseconds
  });
  let user = await User.create({
    username,
    email,
    password,
  });
  if (!user) return res.status(400).json({ message: "User not added" });
  res.status(201).json({
    statusCode: 201,
    message: "user added successfully",
    user: user,
  });
});

//^ login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });

  let isMatch = await compare(password, user.password);

  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  let assessToken = generateAccessToken(User._id);

  res.cookie("accessToken", assessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 1000 * 60 * 15, // 15 minutes in milliseconds
  });
  res.status(200).json({ message: "User logged in successfully" });
});

//^ logout user

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true, // Set httpOnly to true to prevent client-side access to the cookie
    secure: false, // Set secure to true if using HTTPS
    sameSite: "strict", //  Set sameSite to 'strict' or 'lax' based on your requirements
  });
  res.status(200).json({ message: "User logged out successfully" });
});

//^ Update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, username, email } = req.body;
  const userId = req.user._id;

  let user = await User.findById(userId);

  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = name || user.name;
  user.username = username || user.username;
  user.email = email || user.email;
});
