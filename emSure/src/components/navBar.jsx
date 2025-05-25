import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  // log out function
  const handleLogout = async () => {
    await signOut(auth);
    setShowDropdown(false); // closes dropdown
    navigate('/'); // redirects to homepage 
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
            <li className="nav-item"><Link to="/glossary">Learn</Link></li>
            <li className="nav-item"><Link to="/quiz">Quiz</Link></li>
            <li className="nav-item"><Link to="/about">About</Link></li>

            {!user ? (
              <>
                <li className="nav-item"><Link to="/login">Log in</Link></li>
                <li className="nav-item"><Link to="/signup" className="sign-up-btn">Sign Up</Link></li>
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
                    <Link to="/profile" className="dropdown-title" onClick={() => setShowDropdown(false)}> Profile </Link>
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
