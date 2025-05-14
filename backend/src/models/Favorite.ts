import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie_id: { type: Number, ref: 'Movie', required: true }
});

export default mongoose.model('Favorite', favoriteSchema); 