import Volunteer from "../models/volunteerModel.js";
import Role from "../models/roleModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new volunteer
export const register = async (req, res) => {
  try {
    const { fullName, email, password, city, phone_number, role } = req.body;

    if (!["volunteer", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const roleDoc = await Role.findOne({ role_name: role });
    if (!roleDoc) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVolunteer = new Volunteer({
      fullName,
      email,
      password: hashedPassword,
      city,
      phone_number,
      role_id: roleDoc._id,
    });

    await newVolunteer.save();

    const token = jwt.sign(
      { email: newVolunteer.email, id: newVolunteer._id, role: roleDoc.role_name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Registered successfully",
      token,
      volunteer: {
        id: newVolunteer._id,
        fullName: newVolunteer.fullName,
        email: newVolunteer.email,
        role: roleDoc.role_name,
      },
    });
  } catch (err) {
    console.error("Error registering volunteer:", err);
    res.status(500).json({ message: "Error registering", error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const volunteer = await Volunteer.findOne({ email }).populate("role_id", "role_name");
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    const isMatch = await bcrypt.compare(password, volunteer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: volunteer.email, id: volunteer._id, role: volunteer.role_id.role_name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      volunteer: {
        id: volunteer._id,
        fullName: volunteer.fullName,
        email: volunteer.email,
        role: volunteer.role_id.role_name,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

// Get profile
export const volunteerProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const volunteer = await Volunteer.findById(id).populate("role_id", "role_name");
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    res.status(200).json(volunteer);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};

// Get all volunteers
export const volunteers = async (req, res) => {
  try {
    const allVolunteers = await Volunteer.find().populate("role_id", "role_name");
    res.status(200).json(allVolunteers);
  } catch (err) {
    console.error("Error fetching volunteers:", err);
    res.status(500).json({ message: "Error fetching volunteers", error: err.message });
  }
};

// Update volunteer
export const updateVolunteer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if the logged-in user is admin or the owner of the profile
    const requester = req.volunteerData; // set by verifyToken middleware (contains id, email, role)
    
    if (requester.role !== "admin" && requester.id !== id) {
      return res.status(403).json({ message: "You can only update your own profile" });
    }

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedVolunteer = await Volunteer.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedVolunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.status(200).json(updatedVolunteer);
  } catch (err) {
    console.error("Error updating volunteer:", err);
    res.status(500).json({ message: "Error updating volunteer", error: err.message });
  }
};


// Delete volunteer
export const deleteVolunteer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVolunteer = await Volunteer.findByIdAndDelete(id);
    if (!deletedVolunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.status(200).json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    res.status(500).json({ message: "Error deleting volunteer", error: error.message });
  }
};

// Logout
export const logout = async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};
