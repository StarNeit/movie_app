import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth';
import movieRoutes from './routes/movies';
import favoriteRoutes from './routes/favorites';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/login', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/favorites', favoriteRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

export default app; 