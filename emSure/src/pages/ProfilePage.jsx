import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';



export default function ProfilePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    const db = getDatabase();
    const userRef = ref(db, `userData/${currentUser.uid}`);

    const unsubscribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        console.log("No user data found in Realtime DB");
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  if (!userData) {
    return <div className="profile-body"><h1>Loading profile...</h1></div>;
  }


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
            <h2>{userData.username}</h2>
          </div>

          <div className="user-text">
            <div className="title-info">
              <p>firstname</p>
              <div className="user-input">
                <p>{userData.firstName}</p>
              </div>
            </div>
            <div className="title-info">
              <p>lastname</p>
              <div className="user-input">
                <p>{userData.lastName}</p>
              </div>
            </div>
            <div className="title-info">
              <p>Email Address</p>
              <div className="user-input">
                <p>{userData.email}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );

}