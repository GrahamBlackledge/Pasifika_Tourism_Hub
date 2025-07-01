// src/components/layout/NavBar.jsx   (adjust path to match your tree)
import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import logo from "../../assets/logo/logo.png";
import placeholder from "../../assets/images/avatar-placeholder.png";  
import { useAuth } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";            

import "./NavBar.css";

export default function NavBar() {
  const [dropdown, setDropdown] = useState(false);
  const { currentUser, logout } = useAuth();
  const { user } = useContext(UserContext);                      // { avatarUrl, … }

  const toggleDropdown = () => setDropdown((prev) => !prev);

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out");
    } catch (err) {
      alert("Logout error: " + err.message);
    }
  };

  return (
    <nav className="navbar">
      
      <div className="navbar__logo">
        <img src={logo} alt="Pasifika Hub logo" />
      </div>

    
      <ul className="navbar__links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/things-to-do">Things to do</Link></li>
        <li><Link to="/language">Language</Link></li>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/kids">Kids</Link></li>
      </ul>

     
      <div className="navbar__profile">
        <button
          className="avatar-btn"
          onClick={toggleDropdown}
          aria-label="Profile menu"
        >
          <img
            src={user?.avatarUrl || placeholder}
            alt="profile"
            className="avatar-img"
          />
        </button>

        {dropdown && (
          <div className="dropdownMenu">
            {!currentUser ? (
              <>
                <Link to="/login"    onClick={() => setDropdown(false)}>Sign In</Link>
                <Link to="/register" onClick={() => setDropdown(false)}>Sign Up</Link>
              </>
            ) : (
              <>
                <Link to="/profile" onClick={() => setDropdown(false)}>Profile</Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdown(false);
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
