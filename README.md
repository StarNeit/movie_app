# Movie App

A modern full-stack web application for browsing and managing your favorite movies. Built with React (TypeScript) on the frontend and Express (TypeScript) + MongoDB on the backend.

## 🏗️ Project Structure

- **frontend/** – React + TypeScript client (Vite, Tailwind CSS, React Router, Axios)
- **backend/** – Express + TypeScript + MongoDB server (Mongoose, JWT, dotenv, bcryptjs)

## 🛠️ Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or remote instance)
- TMDB API Access Token (for movie data)

## 📦 Installation

### 1. Clone the repository

```bash
git clone <repo-url>
cd movie_app
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory (for example, with the following content):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/movieapp
JWT_SECRET=supersecretkey
TMDB_ACCESS_TOKEN=YOUR_TMDB_ACCESS_TOKEN
```

(Replace `YOUR_TMDB_ACCESS_TOKEN` with your TMDB API token.)

Seed the database (optional):

```bash
npm run seed
```

Start the backend development server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173).

## 🗂️ API Endpoints

- `POST /api/login` – Login (username/email and password)
- `GET /api/movies` – Get paginated movies (query: `page`, `search`)
- `GET /api/movies/:id` – Get movie details
- `GET /api/favorites/:userId` – Get favorite movies for a user
- `GET /api/favorites/ids/:userId` – Get favorite movie IDs for a user
- `POST /api/favorites` – Add or remove a favorite (body: `user_id`, `movie_id`)

## 💡 Features

- Browse and search movies
- View detailed movie information
- User authentication (login)
- Mark/unmark movies as favorites
- Responsive, modern UI

## 🔍 Future Improvements

- Caching for movie data
- Unit and integration tests
- Progressive image loading
- Advanced search filters
- User preferences persistence

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss your proposed changes. 