// Edge Cases — Top Navigation Bar Component
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Terminal, Swords, Menu, X, LogOut, Moon, Sun, Flame } from 'lucide-react';
import '../styles/navbar.css';
import '../styles/buttons.css';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand Wordmark with Swords icon matching Get Started */}
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <span className="brand-icon" style={{ background: 'rgba(197, 244, 103, 0.15)', borderColor: 'rgba(197, 244, 103, 0.4)', color: '#C5F467' }}>
            <Swords size={15} />
          </span>
          <span className="brand-wordmark">
            edge<span>cases</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className={`navbar-nav ${mobileMenuOpen ? 'is-open' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            How it works
          </NavLink>
          <NavLink
            to="/practice"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Practice
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Leaderboard
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/arena"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Arena
              </NavLink>
            </>
          )}
        </nav>

        {/* Right Action / User Area */}
        <div className="navbar-actions">
          {isAuthenticated && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to="/arena" className="btn btn-primary btn-sm">
                <Swords size={13} />
                <span>Battle</span>
              </Link>

              <Link to="/profile" className="user-badge-nav" title="View Profile & Daily Streak Calendar">
                <div className="user-avatar-small">
                  {user.fullName ? user.fullName.slice(0, 2).toUpperCase() : (user.username ? user.username.slice(0, 2).toUpperCase() : 'ME')}
                </div>
                <div className="user-info-small">
                  <span className="user-name-small">{user.username}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span className="user-rating-pill tabular-nums">{user.rating || 1400}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', color: '#FACC15', fontSize: '10px', fontWeight: 700 }}>
                      <Flame size={10} fill="#FACC15" /> {user.streak || 7}d
                    </span>
                  </div>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="btn btn-ghost btn-sm btn-icon"
                title="Log out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to="/login" className="btn btn-ghost btn-sm">
                Log in
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign up
              </Link>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            id="theme-toggle-btn"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            <span className="theme-toggle-knob">
              {theme === 'dark'
                ? <Moon size={11} strokeWidth={2.5} />
                : <Sun  size={11} strokeWidth={2.5} />}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
