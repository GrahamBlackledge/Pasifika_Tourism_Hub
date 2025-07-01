import { useState, useEffect } from "react";
import "./CountryActivities.css";   // keep your original styles

export default function CountryActivities({
  activities,
  editMode = false,          // when true, show delete icons
  onDelete = () => {},       // callback(id)  <- parent handles DELETE API
}) {
  /* ---------- local 'heart' state --------------------------------- */
  const [favorites, setFavorites] = useState([]);

  /* reset hearts if activities array changes */
  useEffect(() => {
    setFavorites(activities.map(a => a.liked ?? false));
  }, [activities]);

  const toggleFavorite = idx =>
    setFavorites(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });

  /* ---------- render ---------------------------------------------- */
  return (
    <div className="cards-container">
      {activities.map((a, i) => (
        <div className="card" key={a._id || i}>
          {/* delete icon (only in edit mode) */}
          {editMode && (
            <button
              className="delete-icon"
              onClick={() => onDelete(a._id)}
              aria-label="Delete activity"
            >
              ✕
            </button>
          )}

          {/* image */}
          {a.imageURL && (
            <img src={a.imageURL} alt={a.title} className="card-img" />
          )}

          {/* title + text */}
          <h2 className="card-title">{a.title}</h2>
          <p className="card-text">{a.description}</p>

          {/* heart */}
          {!editMode && (
            <div
              className="favorite-icon"
              onClick={() => toggleFavorite(i)}
              role="button"
              aria-label={favorites[i] ? "Un-favourite" : "Favourite"}
            >
              {favorites[i] ? "❤️" : "♡"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}