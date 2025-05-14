import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Contact from './pages/Contact';
import Login from './pages/Login';
import './styles/main.scss';
import API from './api';
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user') || 'null'));
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const refreshFavorites = useCallback(() => {
    if (user && token) {
      API.get(`/favorites/ids/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setFavoriteIds(res.data));
    }
  }, [user, token]);

  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  const handleLogin = (token: string, user: any) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    refreshFavorites();
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setFavoriteIds([]);
  };

  if (!token || !user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <Home user={user} token={token} favoriteIds={favoriteIds} refreshFavorites={refreshFavorites} />
            } />
            <Route path="/favorites" element={
              <Favorites user={user} token={token} favoriteIds={favoriteIds} refreshFavorites={refreshFavorites} />
            } />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <footer className="bg-white text-center py-4 mt-8 text-gray-500">
          &copy; {new Date().getFullYear()} MovieApp. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App; 