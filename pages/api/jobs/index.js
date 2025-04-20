import Job from '../models/job.js';
import db from '../../../lib/db';

// const Job = require('models\Job.js');
// const db = require('../../../lib/db');

// async function handler(req, res) {
//   try {
//     await db.connect();
//     /// rest of your existing code
//     const { method } = req;
//     const { page = 1, limit = 10 } = req.query;

//     switch (method) {
//       case 'GET':
//         try {
//           const skip = (page - 1) * limit;
//           const jobs = await Job.find({})
//             .skip(skip)
//             .limit(parseInt(limit))
//             .sort({ postedAt: -1 });
          
//           const total = await Job.countDocuments();
          
//           return res.status(200).json({
//             success: true,
//             data: jobs,
//             pagination: {
//               page: parseInt(page),
//               limit: parseInt(limit),
//               total,
//               pages: Math.ceil(total / limit),
//             },
//           });
//         } catch (error) {
//           return res.status(400).json({ success: false, error: 'Bad Request' });
//         }

//       case 'POST':
//         try {
//           const job = await Job.create(req.body);
//           return res.status(201).json({ success: true, data: job });
//         } catch (error) {
//           return res.status(400).json({ success: false, error: error.message });
//         }

//       default:
//         res.setHeader('Allow', ['GET', 'POST']);
//         return res.status(405).json({ success: false, error: `Method ${method} Not Allowed` });
//     }
//   } catch (error) {
//     console.error('API Error:', error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// }

//module.exports = handler;
  

export default async function handler(req, res) {
    // Debugging: Log environment variables
    console.log('MONGODB_URI from API route:', process.env.MONGODB_URI);
    
    try {
      await db.connect();
    
    const { method } = req;
    const { page = 1, limit = 10 } = req.query;

    switch (method) {
      case 'GET':
        try {
          const skip = (page - 1) * limit;
          const jobs = await Job.find({})
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ postedAt: -1 });
          
          const total = await Job.countDocuments();
          
          return res.status(200).json({
            success: true,
            data: jobs,
            pagination: {
              page: parseInt(page),
              limit: parseInt(limit),
              total,
              pages: Math.ceil(total / limit),
            },
          });
        } catch (error) {
          return res.status(400).json({ success: false, error: 'Bad Request' });
        }

      case 'POST':
        try {
          const job = await Job.create(req.body);
          return res.status(201).json({ success: true, data: job });
        } catch (error) {
          return res.status(400).json({ success: false, error: error.message });
        }

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ success: false, error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server Error',
      env: process.env.MONGODB_URI ? 'ENV LOADED' : 'ENV MISSING'
    });
  }
}
