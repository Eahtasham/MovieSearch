// src/components/MovieSearch.jsx
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import MovieCard from './MovieCard';
import { API_KEY,BASE_URL } from '../config/api';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('Spiderman');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async () => {
    if (!searchTerm) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //setSearchTerm('popular'); // Setting an initial search term
    searchMovies();
    setSearchTerm('');
  }, []);
  

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center">Discover Movies</h1>
      
      <div className="max-w-xl mx-auto flex gap-2">
        <input
          type="text"
          className="input flex-1"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchMovies()}
        />
        <button 
          className="btn btn-primary flex items-center gap-2"
          onClick={searchMovies}
          disabled={loading}
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {!loading && movies.length === 0 && (
        <div className="text-center text-gray-500">
          No movies found. Try searching for something!
        </div>
      )}
    </div>
  );
};

export default MovieSearch;