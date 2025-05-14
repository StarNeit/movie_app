import React, { useEffect, useState, useRef, useCallback } from 'react';
import API from '../api';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import SearchBar from '../components/SearchBar';

const PAGE_SIZE = 9;

const Home: React.FC<{ user: any; token: string; favoriteIds: number[]; refreshFavorites: () => void; }> = ({
  user, token, favoriteIds, refreshFavorites
}) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [modalMovie, setModalMovie] = useState<any | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Fetch movies (append if page > 1, replace if new search)
  useEffect(() => {
    setLoading(true);
    API.get(`/movies?page=${page}&search=${search}`)
      .then(res => {
        setTotal(res.data.total);
        setSuggestions(res.data.movies.map((m: any) => m.title));
        setMovies(prev =>
          page === 1 ? res.data.movies : [...prev, ...res.data.movies]
        );
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [page, search]);

  // Reset to first page and clear movies on new search
  const handleSearch = (q: string) => {
    setSearch(q);
    setPage(1);
    setMovies([]);
  };

  const handleFavorite = (movieId: number) => {
    API.post('/favorites', { user_id: user.id, movie_id: movieId }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(refreshFavorites);
  };

  // Intersection Observer for infinite scroll
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !loading && movies.length < total) {
      setPage(prev => prev + 1);
    }
  }, [loading, movies.length, total]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    };
    const observer = new window.IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  return (
    <div className="home-page">
      <div className="home-page__header">
        <h1 className="home-page__title">Popular Movies</h1>
        <p className="home-page__subtitle">
          Explore our curated collection of exceptional films across all genres
        </p>
      </div>

      <SearchBar onSearch={handleSearch} suggestions={suggestions} />

      <div className="movie-grid__wrapper animate-fade-in">
        <div className="movie-grid">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`animate-fade-in animate-slide-up animate-delay-${index % 3 + 1}`}
            >
              <MovieCard
                movie={movie}
                isShowFavorite
                isFavorite={favoriteIds.includes(movie.id)}
                onFavorite={handleFavorite}
                onClick={() => setModalMovie(movie)}
              />
            </div>
          ))}

          {loading && Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg shadow p-4 animate-pulse h-skeleton" />
          ))}
        </div>
      </div>
      {/* Sentinel div for infinite scroll */}
      <div ref={loaderRef} />
      {modalMovie && (
        <MovieModal
          movie={modalMovie}
          isShowFavorite
          isFavorite={favoriteIds.includes(modalMovie.id)}
          onFavorite={handleFavorite}
          onClose={() => setModalMovie(null)}
        />
      )}
    </div>
  );
};

export default Home;