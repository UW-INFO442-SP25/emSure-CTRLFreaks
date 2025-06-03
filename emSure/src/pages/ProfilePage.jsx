import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';



export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [quizAttempts, setQuizAttempts] = useState([]);


  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) return;

      const db = getDatabase();
      const userRef = ref(db, `userData/${currentUser.uid}`);

      const unsubscribeDB = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData(data);

          if (data.quizzes) {
            const attemptsArray = Object.entries(data.quizzes).map(([id, quiz]) => ({
              id,
              ...quiz,
            }));
            attemptsArray.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
            setQuizAttempts(attemptsArray);
          } else {
            setQuizAttempts([]);
          }
        } else {
          console.log("No user data found in Realtime DB");
        }
      });

      // Cleanup DB listener when component unmounts
      return () => unsubscribeDB();
    });

    // Cleanup auth listener on unmount
    return () => unsubscribeAuth();
  }, []);


  if (!userData) {
    return <div className="profile-body"><h1>Loading profile...</h1></div>;
  }

  const quizAttemptsContent = (() => {
    if (quizAttempts.length === 0) {
      return <p className="no-attempts">No past quiz attempts yet.</p>;
    } else {
      return quizAttempts.map((attempt) => {
        const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
        const formattedDate = new Date(attempt.completedAt).toLocaleDateString("en-US", {
          year: "numeric", month: "short", day: "numeric"
        });

        return (
          <div className="score-card" key={attempt.id}>
            <h3 className="title">{formattedDate}</h3>
            <h3 className="title3">{percentage}%</h3>
            <h3 className="title3">{attempt.score}/{attempt.totalQuestions}</h3>
          </div>
        );
      });
    }
  })();


  return (
    <div className="profile-body">
      <h1>Profile</h1>
      <div className="profile-content">

        <div className="past-attempts-section">

          <h2>Past Attempts</h2>
          <div className="past-scores">
            <div className="titles">
              <p className="title">Date</p>
              <p className="title3">%</p>
              <p className="title3">Score</p>
            </div>
            <div className="past-score-cards">
            {quizAttemptsContent}
            </div>

          </div>
        </div>

        <div className="user-info">
          <div className="photo-username">
            <img className='pfp' src="/imgs/default-pfp.png" alt="pfp"/>
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