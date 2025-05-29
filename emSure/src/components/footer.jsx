import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2 className="footer-logo">em<span className="bold">Sured</span></h2>
          <p className="footer-tagline">Take the guesswork out of health insurance</p>
          <p className="footer-copy">Copyright 2025 © emSured. All Rights Reserved</p>
        </div>
        <div className="footer-links">
          <Link to="/learn">Learn</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </footer>
  );
}
