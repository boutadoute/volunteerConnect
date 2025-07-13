import express from "express";
import {
  register,
  volunteers,
  login,
  volunteerProfile,
  updateVolunteer,
  deleteVolunteer,
  logout,
} from "../controllers/volunteerController.js";
import { registerValidation, loginValidation } from "../middlewares/authValidator.js";
import verifyRole from "../middlewares/verifyRole.js";
import { verifyToken, verifyAdmin } from "../middlewares/authJwt.js";
import Volunteer from "../models/volunteerModel.js";

const router = express.Router();

// Public routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

// Authenticated routes
router.get("/profile/:id", verifyToken, volunteerProfile);

router.get("/volunteers/:id", verifyToken, async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });

    res.json({
      fullName: volunteer.fullName, 
      email: volunteer.email,
      phone_number: volunteer.phone_number,
      city: volunteer.city,
      preferences: volunteer.preferences || {},
    });
  } catch (error) {
    console.error("Error fetching volunteer:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/volunteers", verifyToken, volunteers);

router.put("/vol/update/:id", verifyToken, async (req, res, next) => {
  const loggedInUserId = req.volunteerData.id;
  const loggedInUserRole = req.volunteerData.role;
  const targetId = req.params.id;

  if (loggedInUserRole === "admin" || loggedInUserId === targetId) {
    next();
  } else {
    return res.status(403).json({ message: "You don't have permission to update this user." });
  }
}, updateVolunteer);
router.delete("/vol/delete/:id", verifyRole, deleteVolunteer);
router.delete("/logout", verifyToken, logout);

export default router;
