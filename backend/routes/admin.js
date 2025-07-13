import express from "express";
import verifyAdmin from "../middlewares/verifyRole.js";
import Volunteer from "../models/volunteerModel.js";

const router = express.Router();

// Get admin profile
router.get("/profile/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Volunteer.findById(id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json({
      fullName: admin.fullName,
      email: admin.email,
      phone: admin.phone,
      role: req.role,
      isActive: admin.isActive,
      preferences: admin.preferences,
    });
  } catch (err) {
    console.error("admin profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update admin profile
router.put("/vol/update/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { fullName, email, phone, role, isActive, password, preferences } = req.body;

  try {
    const updateData = {
      fullName,
      email,
      phone,
      role,
      isActive,
      preferences,
    };

    if (password) {
      const bcrypt = await import("bcrypt");
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedAdmin = await Volunteer.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
    if (!updatedAdmin) return res.status(404).json({ message: "Admin not found" });

    res.json(updatedAdmin);
  } catch (err) {
    console.error("admin update error:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

export default router;
