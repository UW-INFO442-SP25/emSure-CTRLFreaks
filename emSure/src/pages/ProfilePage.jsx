import React from 'react';
import { MasteryBar } from '../components/MasteryBar.jsx';

export default function ProfilePage() {
  const mastery = [ // currently hard coded
    { label: 'Health Insurance Basics', value: 0.8 },
    { label: 'Choosing and Using a Health Plan', value: 0.6 },
    { label: 'Costs and Payments', value: 0.4 },
    { label: 'Costs and Payments', value: 0.5 },
    { label: 'Costs and Payments', value: 0.3 },
  ];

  const user = {
    avatar: 'https://placehold.co/200',
    username: 'goatluvr',
    first: 'Claire',
    last: 'Cottril',
    email: 'goatluvr@uw.edu',
  };

  return (
    <div className="profile-bg-container">
      <h1>Profile</h1>
      
      <div className="profile-container">
        <section className="topic-mastery">
          <h2>Topic Mastery</h2>

          {mastery.map((item, i) => (
            <div key={i} className="mastery-row">
              <span className="topic-label">{item.label}</span>

              <MasteryBar value={item.value} />
            </div>
          ))}

        </section>

        <div className="profile-info">
          <div className="avatar-wrapper">
            <img src={user.avatar} alt="avatar" className="avatar" />
          </div>

          <h2 className="username">{user.username}</h2>

          <ul className="details">
            <li>
              <label>First Name</label>
              <p className="pill">{user.first}</p>
            </li>
            <li>
              <label>Last Name</label>
              <p className="pill">{user.last}</p>
            </li>
            <li>
              <label>Email Address</label>
              <p className="pill">{user.email}</p>
            </li>
          </ul>
        </div>

      </div>
      
    </div>

  );

}