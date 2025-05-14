import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Film, Menu, X, LogOut } from 'lucide-react';

type Props = {
  user: any;
  onLogout: () => void;
};

const Navbar: React.FC<Props> = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <NavLink to="/" className="navbar__logo">
          <Film size={24} />
          <span>Movie App</span>
        </NavLink>

        <div className="navbar__links">
          <NavLink to="/" className={({ isActive }) => isActive ? "navbar__link active" : "navbar__link"}>
            Home
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => isActive ? "navbar__link active" : "navbar__link"}>
            Favorites
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "navbar__link active" : "navbar__link"}>
            Contact
          </NavLink>
        </div>

        <div className="navbar__actions">
          {user && (
            <div className="navbar__user">
              <div className="navbar__user-avatar">
                {user.username[0]}
              </div>
              <span className="navbar__user-name d-none d-md-block">{user.name}</span>
              <button className="navbar__logout" onClick={onLogout}>
                <LogOut size={20} />
              </button>
            </div>
          )}

          <button className="navbar__menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`navbar__mobile-menu ${isMenuOpen ? 'show' : ''}`}>
        <div className="navbar__mobile-menu-links">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? "navbar__mobile-menu-link active" : "navbar__mobile-menu-link"}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => isActive ? "navbar__mobile-menu-link active" : "navbar__mobile-menu-link"}
            onClick={() => setIsMenuOpen(false)}
          >
            Favorites
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => isActive ? "navbar__mobile-menu-link active" : "navbar__mobile-menu-link"}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;