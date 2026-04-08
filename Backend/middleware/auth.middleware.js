import asynchandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

export const isAuth = asynchandler(async (req, res, next) => {
  let token = req.cookies.token;

  if (!token)
    res.status(400).json({
      message: "token is not found",
    });
  let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
  req.userId = verifyToken.userId;
});
