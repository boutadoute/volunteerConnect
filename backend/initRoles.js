// initRoles.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Role from "./models/roleModel.js"; // عدّل المسار حسب مجلدك

dotenv.config();

const roles = ["admin", "volunteer"];

async function initRoles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    for (const role_name of roles) {
      const exists = await Role.findOne({ role_name });
      if (!exists) {
        await Role.create({ role_name });
        console.log(`✅ Role "${role_name}" created`);
      } else {
        console.log(`ℹ️ Role "${role_name}" already exists`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error initializing roles:", error);
    process.exit(1);
  }
}

initRoles();
