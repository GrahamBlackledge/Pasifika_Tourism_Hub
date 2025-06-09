import { Link } from 'react-router-dom';
import './CountryCard.css';

export default function CountryCard({ name, image, flag, href }) {
  return (
    <Link to={href} className="country-card-link">
      <article className="country-card">
        <h3 className="country-card__name">{name}</h3>

        
        <div className="country-card__image-wrap">
          <img
            className="country-card__image"
            src={image}
            alt={`${name} scenery`}
          />

        
          <div className="country-card__flag">
            <img src={flag} alt={`${name} flag`} />
          </div>
        </div>
      </article>
    </Link>
  );
}