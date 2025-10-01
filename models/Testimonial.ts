// models/Testimonial.ts
import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  content: { type: String, required: true },
  avatar: { type: String },
});

export default mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);