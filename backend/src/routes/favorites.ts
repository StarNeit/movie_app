import express from 'express';
import { getFavorites, getFavoriteIds, toggleFavorite } from '../controllers/favoriteController';
const router = express.Router();

router.get('/:userId', getFavorites);
router.get('/ids/:userId', getFavoriteIds);
router.post('/', toggleFavorite);

export default router; 