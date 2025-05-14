import React, { MouseEvent } from 'react';
import { X, Star, Heart } from 'lucide-react';

type Props = {
  isFavorite: boolean;
  isShowFavorite?: boolean;
  movie: any;
  onClose: () => void;
  onFavorite: (id: number) => void;
};

const MovieModal: React.FC<Props> = ({ isFavorite, isShowFavorite, movie, onClose, onFavorite }) => {
  const handleFavoriteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    onFavorite(movie.id);
  };

  return (
    <div className="movie-modal__overlay">
      <div className="movie-modal">
        <div className="movie-modal__image">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
          {isShowFavorite && (
            <button
              className={`movie-modal__content-favorite ${isFavorite ? 'active' : ''}`}
              onClick={handleFavoriteClick}
            >
              <Heart size={20} fill={isFavorite ? "#FF9500" : "none"}/>
            </button>
          )}
        </div>

        <div className="movie-modal__content">
          <button className="movie-modal__close" onClick={onClose}>
            <X/>
          </button>

          <h2 className="movie-modal__content-title">{movie.title}</h2>
          <p className="movie-modal__content-release">{movie.release_date}</p>
          <p className="movie-modal__content-overview">{movie.overview}</p>
          <div className="movie-modal__content-vote">
            <span><Star fill="#FF9500"/> {movie.vote_average}</span>
            <span>Votes: {movie.vote_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal; 