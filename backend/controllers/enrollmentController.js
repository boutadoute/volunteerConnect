import Notification from "../models/Notification.js"; // Import your model

export const updateEnrollmentStatus = async (req, res) => {
  try {
    const { id, action } = req.params;

    const enrollment = await Enrollment.findById(id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    enrollment.status = action === "approve" ? "approved" : "rejected";
    await enrollment.save();

    const event = await Event.findById(enrollment.eventId);

    // ✅ Create a notification for the volunteer
    await Notification.create({
      volunteerId: enrollment.volunteerId,
      message: `Votre demande pour "${event.title}" a été ${action === "approve" ? "acceptée" : "refusée"}.`,
    });

    res.json({ message: "Enrollment status updated and notification sent" });
  } catch (err) {
    console.error("Failed to update status:", err);
    res.status(500).json({ message: "Server error" });
  }
};
