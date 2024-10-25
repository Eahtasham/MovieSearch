// src/components/MovieDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Calendar, Languages } from 'lucide-react';
import { API_KEY,BASE_URL,IMAGE_BASE_URL } from '../config/api';


const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!movie) {
    return <div className="text-center py-8">Movie not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="btn flex items-center gap-2 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Search
      </button>

      <div className="card">
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          {movie.backdrop_path ? (
            <>
              <img
                src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              No Backdrop Image
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            {movie.tagline && (
              <p className="text-lg italic opacity-75">{movie.tagline}</p>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>{movie.vote_average.toFixed(1)} / 10</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-5 h-5 text-gray-500" />
              <span>{movie.runtime} minutes</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>{movie.release_date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Languages className="w-5 h-5 text-gray-500" />
              <span>{movie.original_language.toUpperCase()}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-600 leading-relaxed">{movie.overview}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {movie.production_companies?.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Production Companies</h2>
                <div className="flex flex-wrap gap-4">
                  {movie.production_companies.map((company) => (
                    <span key={company.id} className="text-gray-600">
                      {company.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;