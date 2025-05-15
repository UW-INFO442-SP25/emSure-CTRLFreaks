import React, { useState, useEffect } from 'react';
import {
  // for logging in
  signInWithEmailAndPassword,
  // "remember me" function
  setPersistence, browserSessionPersistence, browserLocalPersistence,
  // "forgot passoword" function
  sendPasswordResetEmail
} from "firebase/auth";
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  // form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // loads "remember me" preference from localStorage
  useEffect(() => {
    const savedRememberMe = localStorage.getItem('rememberMe');
    if (savedRememberMe === 'true') {
      setRememberMe(true);
    }
  }, []);

  // handles login form submission
  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      // sets firebase auth persistence based on "remember me" checkbox
      const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistenceType);
      localStorage.setItem('rememberMe', rememberMe);

      // lookup email by username from Firestore
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Username not found.');
        return;
      }

      const userData = querySnapshot.docs[0].data();
      const email = userData.email;

      // log in using email + password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user:", userCredential.user);

      // redirects to homepage
      navigate('/');
    
      // shows message error 
    } catch (err) {
      console.error("Login error:", err.message);
      setError('Invalid username or password. Please try again.');
    }
  };

  // handles forgot password link
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (!username) {
      setError("Please enter your username first.");
      return;
    }

    try {
      // looks up email by username
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Username not found.");
        return;
      }

      const userData = querySnapshot.docs[0].data();
      const email = userData.email;

      // sends password reset email
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent. Check your inbox.");
    } catch (err) {
      console.error("Reset error:", err.message);
      setError("Could not send reset email. Try again.");
    }
  };

  return (
    <div className="bg-container">
      <div className="content-container login-page">
        
        <div className="turtle-side">
          <img src="/imgs/turtle-1.png" alt="Turtle smiling" className="turtle-image" />
        </div>

        <div className="form-side">
          <h1>Welcome Back!</h1>
          <p className="subtitle">Log in to save and track your progress</p>

          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* remember me + forgot password */}
            <div className="form-options">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                /> remember me
              </label>
              <a href="#" className="forgot-link" onClick={handleForgotPassword}>
                forgot password?
              </a>
            </div>

            {/* error message display */}
            {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

            <button type="submit" className="primary-btn login-btn">Log in</button>
          </form>

          <div className="divider">
            <hr /><span>OR</span><hr />
          </div>

          <p className="signup-text">
            Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
