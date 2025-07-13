import express from "express";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById 
} from "../controllers/eventController.js";
import verifyRole from "../middlewares/verifyRole.js";

const router = express.Router();

// Only admins can create, update, or delete events
router.post("/create", verifyRole, createEvent);
router.put("/update/:id", verifyRole, updateEvent);
router.delete("/remove/:id", verifyRole, deleteEvent);

// Anyone can fetch events without authentication
router.get("/get", getEvents);

router.get("/:id", getEventById);

export default router;
