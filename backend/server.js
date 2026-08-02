import express from "express";
import connectDB from "./db/db.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("Success! App is running...");
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
