import jwt from "jsonwebtoken";

export const generateAccessToken = (userID) => {
    return jwt.sign({userID}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

export const generateRefreshToken = (userID) => {
    return jwt.sign({userID}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}


