import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  volunteerId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);
