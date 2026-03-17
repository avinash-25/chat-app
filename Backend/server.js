import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const app = express();
connectDB();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is working" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
