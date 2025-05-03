import express from "express";
import dotenv from "dotenv"; // we cants access .env info even in our app without dotenv
import { connectDB } from "./config/db.js";
import Product from "./models/product.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(express.json()); // Allow us to accept JSON data in the body

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error: ", error.message);
  }
});

app.post("/api/products", async (req, res) => {
  const product = req.body; // user wiil send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide fields" });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error to create product: ", error.message);
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: true, message: "Server Error" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {}
});

app.listen(5000, () => {
  connectDB();
  console.log("Server is runing at 5000");
});
