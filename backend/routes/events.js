import express from "express";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import verifyRole from "../middlewares/verifyRole.js";

const router = express.Router();

// Only admins can create, update, or delete events
router.post("/create", verifyRole, createEvent);
router.put("/update/:id", verifyRole, updateEvent);
router.delete("/remove/:id", verifyRole, deleteEvent);

// Anyone can fetch events without authentication
router.get("/get", getEvents);

export default router;
