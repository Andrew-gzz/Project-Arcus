// backend/app.js
import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import requestLogger from "./middleware/logger.js";
import logger from "./utils/logger.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import wishlistRoutes from "./routes/wishlist.js";
import orderRoutes from "./routes/orders.js";
import subscriptionRoutes from "./routes/subscriptions.js";
import reportRoutes from "./routes/reports.js";
import categoryRoutes from "./routes/category.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Arcus API is running" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
