import React from 'react';

import './ProfilePage.css';
import  ProfileCard from '../components/ProfileCard/ProfileCard'
import FavoriteActivities from "../components/CountryActivities/CountryActivities";

function Profile() {
  return (
    <div className="app">
      <h1>My Experiences</h1>

      <ProfileCard/>
      <FavoriteActivities />

        
      </div>
    
  );
}

export default Profile;

