import { Router } from "express";
import { loginController, meController } from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post("/login", loginController);
authRoutes.get("/me/:userId", meController);

export default authRoutes;
