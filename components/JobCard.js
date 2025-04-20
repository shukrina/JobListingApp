import Link from 'next/link';
import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const JobCard = ({ job }) => {
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (isFavorite(job._id)) {
      removeFavorite(job._id);
    } else {
      addFavorite(job);
    }
  };

  return (
    <Link href={`/jobs/${job._id}`} passHref>
      <div className="border rounded-lg p-4 mb-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500">{job.location}</p>
          </div>
          <button onClick={toggleFavorite} className="text-red-500">
            {isFavorite(job._id) ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        <p className="mt-2 text-gray-700 line-clamp-2">{job.description}</p>
        <div className="mt-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {job.type}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;