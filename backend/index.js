// index.js
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import volunteerRoutes from "./routes/volunteer.js";
import eventRoutes from "./routes/events.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const mongoDBURL = process.env.MONGODB_URI;

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware to parse JSON and urlencoded payloads with large size support
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Route middlewares
app.use("/api/volunteers", volunteerRoutes);
app.use("/event", eventRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Mongo connection error:", error);
  });
