import Job from '../../../models/Job';
import db from '../../../lib/db';

export default async function handler(req, res) {
  await db.connect();
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const job = await Job.findById(id);
        if (!job) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: job });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const job = await Job.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!job) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: job });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedJob = await Job.deleteOne({ _id: id });
        if (!deletedJob) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}