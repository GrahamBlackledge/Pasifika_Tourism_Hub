import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/logo/logo.png'

export default function NavBar() {
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
  <Link to="/profile" aria-label="Go to Profile">👤</Link>
</div>

    </nav>
  );
}
