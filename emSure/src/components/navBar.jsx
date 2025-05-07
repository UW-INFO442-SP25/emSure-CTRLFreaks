import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            emSured
          </Link>
        </div>
        
        <div className="navbar-right">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/learn">Learn</Link>
            </li>

            <li className="nav-item">
              <Link to="/quiz">Quiz</Link>
            </li>

            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>

            <li className="nav-item">
              <Link to="/login">Log in</Link>
            </li>

            <li className="nav-item">
              <Link to="/signup" className="sign-up-btn">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;