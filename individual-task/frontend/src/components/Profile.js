// src/components/Profile.js
import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <div className="profile">
      <h1>Your Name</h1>
      <img src="/profile.jpg" alt="Profile" className="profile-image" />
      <p>Your bio and description here...</p>
      <div className="skills">
        <h3>Skills</h3>
        <ul>
          <li>React</li>
          <li>Nest.js</li>
          <li>Supabase</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;