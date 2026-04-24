import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import erpRoutes from "./routes/erpRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({
    success: true,
    message: "ERP backend is running.",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/erp", erpRoutes);

app.use((_request, response) => {
  response.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

export default app;
