import express from "express";
import dotenv from "dotenv"; // we cants access .env info even in our app without dotenv
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoute.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Allow us to accept JSON data in the body

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is runing at 5000");
});
