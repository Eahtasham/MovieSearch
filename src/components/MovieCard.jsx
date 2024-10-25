// src/components/MovieCard.jsx
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { IMAGE_BASE_URL } from '../config/api';



const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="card cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="aspect-[2/3] relative">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            No Image
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black/75 text-white px-2 py-1 rounded-md flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{movie.title}</h3>
        <p className="text-sm text-gray-500">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {movie.overview || 'No overview available'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;