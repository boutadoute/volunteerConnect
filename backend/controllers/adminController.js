import Volunteer from "../models/Volunteer.js";

export const getAdminProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Volunteer.findById(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin introuvable" });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Accès refusé : utilisateur non-admin" });
    }

    res.status(200).json({
      fullName: admin.fullName,
      email: admin.email,
      phone: admin.phone,
      role: admin.role,
      isActive: admin.isActive,
      preferences: admin.preferences || {},
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du profil admin:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
