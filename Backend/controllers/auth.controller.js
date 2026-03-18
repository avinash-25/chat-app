import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  let existingUser = await User.findOne(username);

  if (!existingUser)
    return res.status(400).json({ message: "User already exist" });

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


export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  let user = await User.findOne({ username });

  if (!user) return res.status(400).json({ message: "User not found" });

  if (user.password !== password)
    return res.status(400).json({ message: "Invalid password" });

  let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60, // 1 hour in millisecondss
  });

  res.status(200).json({ message: "User logged in successfully" });
});
