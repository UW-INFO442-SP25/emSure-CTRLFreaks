import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Navbar() {
  const [user, setUser] = useState(null); // stores logged-in user

  // check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
              // show login & sign up buttons if not logged in
              <>
                <li className="nav-item"><Link to="/login">Log in</Link></li>
                <li className="nav-item"><Link to="/signup" className="sign-up-btn">Sign Up</Link></li>
              </>
            ) : (
              // show profile icon if logged in
              <li className="nav-item">
                <Link to="/profile">
                  <img
                    src="/imgs/defaultpfp.png" 
                    className="profile-icon"
                  />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
