import mongoose from 'mongoose';
import connectDB from '../lib/db.js';

// Initialize connection
await connectDB();

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // ... other fields
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String },
  type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
  skills: { type: [String] },
  postedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Job || mongoose.model('Job', jobSchema);