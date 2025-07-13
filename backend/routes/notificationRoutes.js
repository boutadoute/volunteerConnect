import express from "express";
import Notification from "../models/Notification.js";


const router = express.Router();


router.get("/:volunteerId", async (req, res) => {
  try {
    const { volunteerId } = req.params;

    if (!volunteerId) {
      return res.status(400).json({ error: "Volunteer ID is required" });
    }

    const notifications = await Notification.find({ volunteerId }).sort({ createdAt: -1 });
    res.status(200).json(notifications); 
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ error: "userId and message are required" });
    }

    const newNotification = new Notification({
      volunteerId: userId,
      message,
    });

    await newNotification.save();
    res.status(201).json({ success: true, message: "Notification sent successfully" });
  } catch (err) {
    console.error("Error sending notification:", err);
    res.status(500).json({ error: "Failed to send notification" });
  }
});

export default router;
