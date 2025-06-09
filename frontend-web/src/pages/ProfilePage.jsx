import React from 'react';

import './ProfilePage.css';

function Profile() {
  return (
    <div className="app">
      <h1>My Experiences</h1>

      <div className="profile-section">
        <div className="user-info">
          <img
            src="/profile-placeholder.png" 
            alt="User Profile"
            className="profile-picture"
          />
          <div className="info-row">
            <span className="label">Username:</span>
            <span className="value">Gregory Fakename</span>
          </div>
          <div className="info-row">
            <span className="label">Email:</span>
            <span className="value">example@email.com</span>
          </div>
        </div>

        <div className="experience-card">
        </div>
      </div>
    </div>
  );
}

export default Profile;

