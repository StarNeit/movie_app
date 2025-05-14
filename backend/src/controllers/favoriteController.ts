import { Request, Response } from 'express';
import Favorite from '../models/Favorite';
import Movie from '../models/Movie';

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const favorites = await Favorite.find({ user_id: req.params.userId });
    const movieIds = favorites.map(fav => fav.movie_id);
    const movies = await Movie.find({ id: { $in: movieIds } });
    res.json(movies);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getFavoriteIds = async (req: Request, res: Response) => {
  try {
    const favorites = await Favorite.find({ user_id: req.params.userId });
    res.json(favorites.map(fav => fav.movie_id));
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const toggleFavorite = async (req: Request, res: Response) => {
  const { user_id, movie_id } = req.body;
  try {
    const existing = await Favorite.findOne({ user_id, movie_id });
    if (existing) {
      await Favorite.deleteOne({ user_id, movie_id });
      return res.json({ message: 'Removed from favorites' });
    } else {
      await Favorite.create({ user_id, movie_id });
      return res.json({ message: 'Added to favorites' });
    }
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
}; 