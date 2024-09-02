import axios from "axios"
import Product from "../models/productModel.js"
import connectDB from "../config/db.js"
import express from "express"

const router = express.Router()

router.get("/", async (req, res) => {
  console.log("seeding")
  await connectDB()
  const products = await axios.get("https://dummyjson.com/products?limit=0")
  await Product.insertMany(products.data.products)
  res.send({ status: "success" })
})

export default router
