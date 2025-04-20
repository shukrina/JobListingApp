import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FavoritesContext } from '../../context/FavoritesContext';
import { FaHeart, FaRegHeart, FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import ApplicationForm from '../../components/ApplicationForm';
import Head from 'next/head';

const JobDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    if (id) {
      const fetchJob = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/api/jobs/${id}`);
          setJob(response.data.data);
        } catch (error) {
          console.error('Error fetching job:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchJob();
    }
  }, [id]);

  const toggleFavorite = () => {
    if (isFavorite(job._id)) {
      removeFavorite(job._id);
    } else {
      addFavorite(job);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!job) {
    return <div className="text-center py-8">Job not found</div>;
  }

  return (
    <>
      <Head>
        <title>{job.title} | {job.company}</title>
        <meta name="description" content={job.description.substring(0, 160)} />
      </Head>
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{job.title}</h1>
                <div className="flex items-center mt-2 text-gray-600">
                  <FaBuilding className="mr-2" />
                  <span>{job.company}</span>
                </div>
              </div>
              <button
                onClick={toggleFavorite}
                className="text-red-500 text-2xl"
                aria-label={isFavorite(job._id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite(job._id) ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2" />
                <span>{job.location}</span>
              </div>
              {job.salary && (
                <div className="flex items-center text-gray-600">
                  <FaMoneyBillWave className="mr-2" />
                  <span>{job.salary}</span>
                </div>
              )}
              <div className="flex items-center text-gray-600">
                <FaClock className="mr-2" />
                <span>{job.type}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Job Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
            </div>
            
            {job.skills && job.skills.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Apply for this position</h2>
            <ApplicationForm jobId={job._id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;