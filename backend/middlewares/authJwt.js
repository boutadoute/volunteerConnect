import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing or malformed" });
  }

  const token = authHeader.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    req.user = decoded; // renamed from req.volunteerData to req.user for general use
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "associate")) {
    return next();
  }
  return res.status(403).json({ message: "Access denied: Admins only" });
};
