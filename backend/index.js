// index.js
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import volunteerRoutes from "./routes/volunteer.js";
import eventRoutes from "./routes/events.js";
import enrollmentsRouter from "./routes/enrollments.js";
import adminRoutes from "./routes/admin.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const mongoDBURL = process.env.MONGODB_URI;

// ✅ CORS middleware — must come before routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Body parser — also before routes
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));


app.use("/api/admins", adminRoutes);

app.use("/notifications", notificationRoutes);

// ✅ Route middlewares — after CORS/bodyParser
app.use("/enrollments", enrollmentsRouter);
app.use("/api/volunteers", volunteerRoutes);
app.use("/event", eventRoutes);

// ✅ Connect to MongoDB and start the server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });
