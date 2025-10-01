// models/ServiceEnquiry.ts
import mongoose from "mongoose";

const serviceEnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  message: { type: String, required: true },
  plan: {
    name: { type: String, required: true },
    price: { type: String, required: true },
    type: { type: String, required: true },
  },
  submittedAt: { type: Date, default: Date.now },
  status: { type: String, default: "new" },
});

export default mongoose.models.ServiceEnquiry || mongoose.model("ServiceEnquiry", serviceEnquirySchema);