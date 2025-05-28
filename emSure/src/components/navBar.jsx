import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        !e.target.classList.contains('profile-icon')
      ) {
        setShowDropdown(false);
      }

      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        !e.target.closest('.hamburger')
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setShowDropdown(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">emSured</Link>
        </div>

        <div className="navbar-right">
          <ul ref={menuRef} className={`nav-menu ${menuOpen ? 'show-menu' : ''}`}>
            <li className="nav-item">
              <Link to="/glossary" className={location.pathname === "/glossary" ? "active-nav-link" : ""}>Learn</Link>
            </li>
            <li className="nav-item">
              <Link to="/quiz" className={location.pathname === "/quiz" ? "active-nav-link" : ""}>Quiz</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className={location.pathname === "/about" ? "active-nav-link" : ""}>About</Link>
            </li>
            {!user && (
              <li className="nav-item">
                <Link to="/login" className={location.pathname === "/login" ? "active-nav-link" : ""}>Log in</Link>
              </li>
            )}
          </ul>

          {!user ? (
            <Link to="/signup" className={`sign-up-btn ${location.pathname === "/signup" ? "active-nav-link" : ""}`}>
              Sign up
            </Link>
          ) : (
            <div className="profile-container" ref={dropdownRef}>
              <img
                src="/imgs/PFP.png"
                alt="Profile"
                className="profile-icon"
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link
                    to="/profile"
                    className={`dropdown-title ${location.pathname === "/profile" ? "active-nav-link" : ""}`}
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button className="logout-button" onClick={handleLogout}>Log out</button>
                </div>
              )}
            </div>
          )}

          <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </div>
      </div>
    </nav>
  );
}
