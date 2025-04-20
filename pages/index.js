import { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';
import Pagination from '../components/Pagination';
import { FavoritesProvider } from '../context/FavoritesContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });

  const fetchJobs = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/jobs?page=${page}&limit=${pagination.limit}`);
      setJobs(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page') || 1;
    fetchJobs(page);
  }, []);

  const handlePageChange = (page) => {
    fetchJobs(page);
    window.scrollTo(0, 0);
  };

  return (
    <FavoritesProvider>
      <Head>
        <title>Job Listings</title>
        <meta name="description" content="Browse available job opportunities" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Job Listings</h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                {jobs.map(job => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
              
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>
        <ToastContainer position="bottom-right" />
      </div>
    </FavoritesProvider>
  );
};

export default Home;