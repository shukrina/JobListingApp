import 'dotenv/config'; // Must be first import
import mongoose from 'mongoose';
import Job from '../models/job.js';

// Debug: Verify environment variable is loading
console.log('MONGODB_URI:', process.env.MONGODB_URI); 

async function seedDatabase() {
  try {
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    await Job.deleteMany({});
    await Job.insertMany([
      {
        title: 'Frontend Developer',
        description: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces using React and Next.js.',
        company: 'TechCorp',
        location: 'San Francisco, CA',
        salary: '$90,000 - $120,000',
        type: 'Full-time',
        skills: ['React', 'JavaScript', 'CSS', 'HTML'],
      },
      {
        title: 'Backend Engineer',
        description: 'Join our backend team to develop scalable APIs and services. Experience with Node.js and databases required.',
        company: 'DataSystems',
        location: 'Remote',
        salary: '$100,000 - $130,000',
        type: 'Full-time',
        skills: ['Node.js', 'MongoDB', 'API Design', 'AWS'],
      },
      {
        title: 'UX Designer',
        description: 'We need a creative UX Designer to improve our product interfaces and user flows. Portfolio required.',
        company: 'DesignHub',
        location: 'New York, NY',
        salary: '$80,000 - $110,000',
        type: 'Full-time',
        skills: ['UI/UX', 'Figma', 'User Research', 'Prototyping'],
      },
      // Add more sample jobs as needed
    ]);
    console.log('✅ Database seeded!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();

