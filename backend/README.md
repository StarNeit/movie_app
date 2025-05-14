# Movie Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the backend directory with the following content:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/movieapp
   JWT_SECRET=supersecretkey
   TMDB_ACCESS_TOKEN=YOUR_TMDB_ACCESS_TOKEN
   ```
   Replace `YOUR_TMDB_ACCESS_TOKEN` with your TMDB API token.

3. Seed the database:
   ```bash
   npm run seed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints
- `POST /api/login` — Login with username/email and password
- `GET /api/movies` — Get paginated movies (query: `page`, `search`)
- `GET /api/movies/:id` — Get movie details
- `GET /api/favorites/:userId` — Get favorite movies for user
- `GET /api/favorites/ids/:userId` — Get favorite movie IDs for user
- `POST /api/favorites` — Add/remove favorite (body: `user_id`, `movie_id`) 