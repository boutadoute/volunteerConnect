// index.js
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import volunteerRoutes from "./routes/volunteer.js";
import eventRoutes from "./routes/events.js";

dotenv.config(); 

const app = express();
const port = process.env.PORT || 8000;           
const mongoDBURL = process.env.MONGODB_URI;     

// middlewear
app.use(bodyParser.json());

// routes
app.use("/", volunteerRoutes);
app.use("/event", eventRoutes);


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(" Mongo connection error:", error);
  });
