import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Movie from '../models/Movie';

dotenv.config();

const TMDB_URL = 'https://try.readme.io/https://api.themoviedb.org/3/movie/popular?language=en-US&page=';
const TMDB_TOKEN = process.env.TMDB_ACCESS_TOKEN!;

async function seed() {
  await mongoose.connect(process.env.MONGO_URI!);

  // Create test user
  const hashedPassword = await bcrypt.hash('@TeamAglet', 10);
  await User.deleteMany({});
  await User.create({
    username: 'jointheteam',
    email: 'jointheteam@aglet.co.za',
    password: hashedPassword
  });

  await Movie.deleteMany({});

  for (let page = 1; page <= 3; page++) {
    const { data } = await axios.get(`${TMDB_URL}${page}`, {
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${TMDB_TOKEN}`,
        origin: 'https://developer.themoviedb.org'
      }
    });
    await Movie.insertMany(data.results, { ordered: false }).catch(() => {});
  }

  const allMovies = await Movie.find();

  await Movie.deleteMany({});

  await Movie.insertMany(allMovies.slice(0, 45), { ordered: false }).catch(() => {});

  console.log('Seed complete');
  process.exit();
}
seed(); 
