import express from "express";
import Product from "../models/productModel.js";
import connectDB from "../config/db.js";
import { getProductById, getQueryProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getQueryProducts);


router.get("/details/:id", getProductById);

export default router;
