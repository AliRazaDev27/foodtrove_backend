import express from "express";
import { registerController, loginController, logoutController } from "../controllers/userControllers.js";
const router = express.Router();

router.post("/login", loginController)

router.get("/logout", logoutController)

router.post("/register", registerController)

export default router;
