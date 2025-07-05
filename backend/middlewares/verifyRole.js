import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Role from "../models/roleModel.js";
import Volunteer from "../models/volunteerModel.js";

dotenv.config();

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing or malformed" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.volunteerData = decoded;

    const volunteer = await Volunteer.findOne({ email: decoded.email });
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    const role = await Role.findById(volunteer.role_id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    if (role.role_name === "admin") {
      return next();
    } else {
      return res.status(403).json({ message: "You don't have access to this route" });
    }
  } catch (err) {
    console.error("VerifyRole error:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
