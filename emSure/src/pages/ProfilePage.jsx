import React from 'react';
import { MasteryBar } from '../components/MasteryBar.jsx';

export default function ProfilePage() {
  const user = {
    avatar: 'https://placehold.co/200',
    username: 'goatluvr',
    first: 'Claire',
    last: 'Cottril',
    email: 'goatluvr@uw.edu',
  };

  return (
    <div className="profile-body">
      <h1>Profile</h1>
      <div className="profile-content">

        <div className="past-attempts-section">

          <h2>Past Attempts</h2>
          <div className="past-scores">
            <div className="titles">
              <p className="title">Date</p>
              <p className="title">%</p>
              <p className="title">Score</p>
            </div>
            <div className="past-score-cards">
              <div className="score-card">
                <h3 className="title">19 Apr 2025</h3>
                <h3 className="title">100%</h3>
                <h3 className="title">15/15</h3>
              </div>
              <div className="score-card">
                <h3 className="title">19 Apr 2025</h3>
                <h3 className="title">100%</h3>
                <h3 className="title">15/15</h3>
              </div>
              <div className="score-card">
                <h3 className="title">19 Apr 2025</h3>
                <h3 className="title">100%</h3>
                <h3 className="title">15/15</h3>
              </div>
            </div>

          </div>
        </div>

        <div className="user-info">
          <div className="photo-username">
            <img className='pfp' src="../../public/imgs/dawn-pfp.png" alt="pfp"/>
            <h2>GoatLuvr</h2>
          </div>

          <div className="user-text">
            <div className="title-info">
              <p>firstname</p>
              <div className="user-input">
                <p>Claire</p>
              </div>
            </div>
            <div className="title-info">
              <p>lastname</p>
              <div className="user-input">
                <p>Cotril</p>
              </div>
            </div>
            <div className="title-info">
              <p>Email Address</p>
              <div className="user-input">
                <p>urmom@gmail.com</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );

}