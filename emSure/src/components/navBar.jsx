import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Navbar() {
  const [user, setUser] = useState(null); 
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setShowDropdown(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">emSured</Link>
        </div>

        <div className="navbar-right">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/glossary" className={location.pathname === "/glossary" ? "active-nav-link" : ""}>Learn</Link>
            </li>

            <li className="nav-item">
              <Link to="/quiz" className={location.pathname === "/quiz" ? "active-nav-link" : ""}>Quiz</Link>
            </li>

            <li className="nav-item">
              <Link to="/about" className={location.pathname === "/about" ? "active-nav-link" : ""}>About</Link>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className={location.pathname === "/login" ? "active-nav-link" : ""}>Log in</Link>
                </li>

                <li className="nav-item">
                  <Link to="/signup" className={`sign-up-btn ${location.pathname === "/signup" ? "active-nav-link" : ""}`}>Sign Up</Link>
                </li>
              </>
            ) : (
              <li className="nav-item profile-container">
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
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
