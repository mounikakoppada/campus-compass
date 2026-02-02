import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar glass">
      <div className="container nav-content">
        <Link to="/dashboard" className="logo">
          <span className="logo-icon">🧭</span>
          <strong>Campus Compass</strong>
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/roadmap" onClick={() => setMenuOpen(false)}>Roadmap</Link>
          <Link to="/guidance" onClick={() => setMenuOpen(false)}>Guidance</Link>
          <Link to="/planner" onClick={() => setMenuOpen(false)}>Time Management</Link>
          <Link to="/coding" onClick={() => setMenuOpen(false)}>Coding</Link>
          <Link to="/mentors" onClick={() => setMenuOpen(false)}>Mentors</Link>
          <Link to="/wellbeing" onClick={() => setMenuOpen(false)}>Well-being</Link>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          height: 70px;
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          color: var(--primary);
        }
        .menu-toggle {
          display: none;
          background: none;
          font-size: 1.5rem;
          padding: 0.5rem;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-links a {
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text-main);
        }
        .nav-links a:hover { color: var(--primary); }
        .btn-logout {
          padding: 0.5rem 1rem;
          border: 1px solid var(--error);
          color: var(--error);
          background: transparent;
          border-radius: var(--radius-sm);
          font-weight: 600;
        }
        .btn-logout:hover {
          background: var(--error);
          color: white;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }
          .nav-links {
            display: none;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1.5rem;
            gap: 1rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }
          .nav-links.open {
            display: flex;
          }
          .nav-links a {
            font-size: 1.1rem;
            padding: 0.5rem 0;
          }
          .btn-logout {
            width: 100%;
            text-align: center;
            margin-top: 0.5rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
