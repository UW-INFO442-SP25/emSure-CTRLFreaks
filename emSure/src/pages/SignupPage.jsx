import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, setPersistence, browserSessionPersistence, browserLocalPersistence } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

export default function SignupPage() {
  // form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // remember me: check local storage 
      useEffect(() => {
        const savedRememberMe = localStorage.getItem('rememberMe');
        if (savedRememberMe === 'true') {
          setRememberMe(true);
        }
      }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
    // for the remember me function:
          const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
          await setPersistence(auth, persistenceType);
          localStorage.setItem('rememberMe', rememberMe);

      // create Firebase user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // saves additional user info to firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        username,
        email
      });

      // goes to homepage after signing in
      navigate('/');

      // if signup fails, shows error message 
    } catch (err) {
      console.error(err);
      setError(err.message);
    }

  };

  return (
    <div className="bg-container">
      <div className="content-container signup-page">
        <div className="turtle-side">
          <img src="/imgs/turtle-1.png" alt="Turtle smiling" className="turtle-image" />
        </div>

        <div className="form-side">
          <h1>Welcome!</h1>
          <p className="subtitle">Sign up to start saving and tracking your progress.</p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form className="login-form" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input
                type="text"
                placeholder="first name"
                className="input-field"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ flex: 1 }}
              />
              <input
                type="text"
                placeholder="last name"
                className="input-field"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{ flex: 1 }}
              />
            </div>

            <input
              type="email"
              placeholder="email address"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="form-options">
            <label>
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                /> remember me
              </label>
            </div>

            <button type="submit" className="primary-btn login-btn">Sign up</button>
          </form>
          <div className="divider">
            <hr /><span>OR</span><hr />
          </div>

          <p className="signup-text">
            Have an account? <Link to="/login" className="signup-link">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
