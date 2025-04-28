import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <a href="/" className="navbar-logo">
            emSured
          </a>
        </div>
        
        <div className="navbar-right">
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="/learn">Learn</a>
            </li>

            <li className="nav-item">
              <a href="/quiz">Quiz</a>
            </li>

            <li className="nav-item">
              <a href="/about">About</a>
            </li>

            <li className="nav-item">
              <a href="/login">Log in</a>
            </li>
            
            <li className="nav-item">
              <a href="/signup" className="sign-in-btn">Sign In</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;