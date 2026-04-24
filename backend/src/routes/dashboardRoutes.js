import { Router } from "express";
import {
  bootstrapController,
  moduleDetailController,
} from "../controllers/dashboardController.js";

const dashboardRoutes = Router();

dashboardRoutes.get("/bootstrap", bootstrapController);
dashboardRoutes.get("/modules/:moduleId", moduleDetailController);

export default dashboardRoutes;
