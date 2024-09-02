import express from "express";
import Product from "../models/productModel.js";
import connectDB from "../config/db.js";

const router = express.Router();

router.get("/:page", async (req, res) => {
  await connectDB();
  const { page } = req.params;
  const products = await Product.find().skip((page - 1) * 16).limit(8);
  res.send(products);
});

router.delete("/", async (req, res) => {
  await connectDB();
  await Product.delete().skip(194);
});


export default router;
