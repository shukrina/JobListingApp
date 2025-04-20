import Job from '../../../models/Job';
import db from '../../../lib/db';

export default async function handler(req, res) {
  await db.connect();

  if (req.method === 'POST') {
    try {
      const { jobId, name, email, coverLetter } = req.body;
      
      // Basic validation
      if (!name || !email || !coverLetter) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }
      
      // Simple email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
      }

      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ success: false, message: 'Job not found' });
      }

      // In a real app, you'd want to store applications in a separate collection
      job.applications = job.applications || [];
      job.applications.push({
        name,
        email,
        coverLetter,
        appliedAt: new Date(),
      });

      await job.save();
      
      res.status(201).json({ success: true, message: 'Application submitted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}