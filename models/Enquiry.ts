// models/Enquiry.ts
import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  status: { type: String, default: "new" },
});

export default mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);