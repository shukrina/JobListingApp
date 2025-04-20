import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import JobCard from '../components/JobCard';
import Head from 'next/head';

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <>
      <Head>
        <title>Favorite Jobs</title>
        <meta name="description" content="Your favorite job listings" />
      </Head>
      
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Your Favorite Jobs</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">You haven't saved any favorite jobs yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {favorites.map(job => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FavoritesPage;