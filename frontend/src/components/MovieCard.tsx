import React, { MouseEvent } from 'react';
import { Star, Heart } from 'lucide-react';

type Props = {
  movie: any;
  isShowFavorite?: boolean;
  isFavorite: boolean;
  onFavorite: (id: number) => void;
  onClick: () => void;
};

const MovieCard: React.FC<Props> = ({ movie, isFavorite, isShowFavorite, onFavorite, onClick }) => {
  const handleFavoriteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    onFavorite(movie.id);
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(movie.vote_average / 2);
    const hasHalfStar = movie.vote_average % 2 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={16} fill="#FF9500" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} size={16} fill="#FF9500" className="half-star" />);
      } else {
        stars.push(<Star key={i} size={16} />);
      }
    }
    return stars;
  };

  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-card__poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      {isShowFavorite && (
        <button
          className={`movie-card__favorite ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={20} fill={isFavorite ? "#FF9500" : "none"} />
        </button>
      )}

      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__release">{movie.release_date}</div>
        <div className="movie-card__rating">
          <div className="movie-card__rating-stars">
            {renderStars()}
          </div>
          <div className="movie-card__rating-score">{movie.vote_average.toFixed(1)}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard; 