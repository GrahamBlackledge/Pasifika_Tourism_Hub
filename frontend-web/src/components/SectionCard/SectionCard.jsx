import { Link } from 'react-router-dom';
import './SectionCard.css';

export default function SectionCard({ title, image, link }) {
  return (
    <Link to={link} className="section-card">
      <h3>{title}</h3>
      <img src={image} alt={title} />
    </Link>
  );
}