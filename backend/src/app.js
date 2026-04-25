import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import erpRoutes from "./routes/erpRoutes.js";

const app = express();

// ✅ Allowed origins (local + deployed frontend)
const allowedOrigins = [
  "http://localhost:5173",
  "https://erp-system-lemon-sigma.vercel.app"
];

// ✅ CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ CORS not allowed: " + origin));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Health check
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "ERP backend is running 🚀",
  });
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/erp", erpRoutes);

// ❌ 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;