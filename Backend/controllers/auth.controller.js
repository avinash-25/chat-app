import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { generateAccessToken } from "../config/token.config.js";


//^ register user
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  let existingUser = await User.findOne(username);

  if (!existingUser)
    return res.status(400).json({ message: "User already exist" });

  let assessToken = generateAccessToken(user._id);
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

  if (user.password !== password)
    return res.status(400).json({ message: "Invalid password" });

  let assessToken = generateAccessToken(user._id);

  res.cookie("accessToken", assessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 1000 * 60 * 15, // 15 minutes in milliseconds
  });
  res.status(200).json({ message: "User logged in successfully" });
});
