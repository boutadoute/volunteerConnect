import express from "express";
import Enrollment from "../models/Enrollment.js";
import { verifyToken, verifyAdmin } from "../middlewares/authJwt.js";

const router = express.Router();

// Volunteer applies to event
router.post("/", verifyToken, async (req, res) => {
  console.log("🔎 Body received:", req.body);
  console.log("🔐 User from token:", req.user);

  try {
    const { eventId } = req.body;
    const volunteerId = req.user?.id; 

    if (!eventId || !volunteerId) {
      return res.status(400).json({ message: "Missing eventId or volunteerId" });
    }

    const exists = await Enrollment.findOne({ eventId, volunteerId });
    if (exists) return res.status(400).json({ message: "Already enrolled or pending" });

    const enrollment = new Enrollment({ eventId, volunteerId });
    await enrollment.save();

    res.status(201).json(enrollment);
  } catch (error) {
    console.error("❌ Enrollment error:", error);
    res.status(500).json({ error: error.message });
  }
});


// Admin gets pending enrollments for their events
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ status: "pending" })
      .populate("volunteerId", "fullName email")
      .populate("eventId", "title date");

    // Formate les données pour le frontend
      const formatted = enrollments.map(e => ({
        _id: e._id,
        volunteerId: e.volunteerId?._id,
        volunteerName: e.volunteerId?.fullName || "Anonyme",
        eventTitle: e.eventId?.title || "Titre inconnu",
        status: e.status,
      }));

    res.json(formatted);
  } catch (error) {
    console.error("Erreur GET /enrollments:", error);
    res.status(500).json({ error: error.message });
  }
});


// Admin approves enrollment
router.put("/:id/approve", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const adminId = req.user.id;
    const enrollmentId = req.params.id;

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    enrollment.status = "approved";
    enrollment.respondedAt = new Date();
    enrollment.responseByAdminId = adminId;

    await enrollment.save();

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin rejects enrollment
router.put("/:id/reject", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const adminId = req.user.id;
    const enrollmentId = req.params.id;

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    enrollment.status = "rejected";
    enrollment.respondedAt = new Date();
    enrollment.responseByAdminId = adminId;

    await enrollment.save();

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get all enrollments for a specific volunteer (used in volunteer dashboard)
router.get("/volunteer/:volunteerId", verifyToken, async (req, res) => {
  try {
    const { volunteerId } = req.params;

    const enrollments = await Enrollment.find({ volunteerId })
      .populate("eventId", "title date location")
      .sort({ requestedAt: -1 });

    // Optional: format response
    const formatted = enrollments.map((e) => ({
      _id: e._id,
      status: e.status,
      requestedAt: e.requestedAt,
      event: {
        title: e.eventId?.title || "Événement inconnu",
        date: e.eventId?.date,
        location: e.eventId?.location,
      },
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error in GET /enrollments/volunteer/:volunteerId:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /enrollments/:id - Get single enrollment by ID
router.get("/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate("eventId", "title") // ⬅️ Get only the title
      .lean();

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    res.json({
      ...enrollment,
      eventTitle: enrollment.eventId?.title || "Titre introuvable",
    });
  } catch (error) {
    console.error("Error fetching enrollment:", error);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
