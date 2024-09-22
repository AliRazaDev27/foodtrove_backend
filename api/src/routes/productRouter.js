import express from "express";
import { getProductById, getQueryProducts, } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getQueryProducts);

router.get("/details/:id", getProductById);

export default router;
