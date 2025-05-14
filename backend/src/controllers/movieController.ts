import { Request, Response } from 'express';
import Movie from '../models/Movie';

export const getMovies = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const search = (req.query.search as string) || '';
  const limit = 9;
  const query = search
    ? { title: { $regex: search, $options: 'i' } }
    : {};

  try {
    const movies = await Movie.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Movie.countDocuments(query);
    res.json({ movies, total });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findOne({ id: req.params.id });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
}; 