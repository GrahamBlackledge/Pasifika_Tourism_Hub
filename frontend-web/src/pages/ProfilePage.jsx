import PostFeed from "../components/PostFeed/PostFeed";

import "./ProfilePage.css";
import ProfileCard from "../components/ProfileCard/ProfileCard";

function Profile() {
  return (
    <div className="app">
      <ProfileCard />

      <h1>My Experiences</h1>

      <PostFeed />
    </div>
  );
}

export default Profile;