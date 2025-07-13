// import mongoose from "mongoose";

// const enrollmentSchema = new mongoose.Schema({
//   eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
//   volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: "Volunteer", required: true },
//   status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
//   requestedAt: { type: Date, default: Date.now },
//   respondedAt: Date,
//   responseByAdminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
// });

// const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
// export default Enrollment;

import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", 
      required: true,
    },
    volunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
