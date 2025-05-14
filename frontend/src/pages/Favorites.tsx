import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../api';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';

const Favorites: React.FC<{ user: any; token: string; favoriteIds: number[]; refreshFavorites: () => void; }> = ({
  user, token, favoriteIds, refreshFavorites
}) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [modalMovie, setModalMovie] = useState<any | null>(null);

  useEffect(() => {
    API.get(`/favorites/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMovies(res.data));
  }, [user, token, refreshFavorites]);

  const handleFavorite = (movieId: number) => {
    API.post('/favorites', { user_id: user.id, movie_id: movieId }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(refreshFavorites);
  };

  return (
    <div className="favorites-page">
      <div className="favorites-page__header">
        <h1 className="text-2xl font-bold mb-4">Favorite Movies</h1>
        <p className="text-muted">Movies you've saved to watch again</p>
      </div>

      {!movies.length && (
        <div className="favorites-page__empty animate-fade-in">
          <div className="favorites-page__empty-icon">
            <Heart size={48} />
          </div>
          <h3 className="favorites-page__empty-title">No favorites yet</h3>
          <p className="favorites-page__empty-text">
            You haven't added any movies to your favorites yet. Browse our collection and click the heart icon to add movies you love.
          </p>
          <Link to="/" className="btn btn--primary">
            Browse Movies
          </Link>
        </div>
      )}

      {movies.length > 0 && (
        <div className="movie-grid animate-fade-in">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`animate-fade-in animate-slide-up animate-delay-${index % 3 + 1}`}
            >
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={favoriteIds.includes(movie.id)}
                onFavorite={handleFavorite}
                onClick={() => setModalMovie(movie)}
              />
            </div>
          ))}
        </div>
      )}

      {modalMovie && (
        <MovieModal
          isFavorite={favoriteIds.includes(modalMovie.id)}
          onFavorite={handleFavorite}
          movie={modalMovie}
          onClose={() => setModalMovie(null)}
        />
      )}
    </div>
  );
};

export default Favorites; 