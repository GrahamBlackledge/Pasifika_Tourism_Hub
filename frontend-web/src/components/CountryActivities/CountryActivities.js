import { useAuth } from "../context/AuthContext";      
import useLikes      from "../../hooks/useLikes";
import "./CountryActivities.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";  

export default function CountryActivities({
  activities = [],           
  editMode = false,
  onDelete = () => {},
}) {
  const { currentUser } = useAuth(); 
  const firebaseUid = currentUser?.uid;                  
  const likes = useLikes(firebaseUid);                

  return (
    <div className="cards-container">
      {activities.map((a) => {
        const liked = likes.isLiked(a.countrySlug, a._id);

        console.log({
        activitySlug: a.countrySlug,
        activityId:   a._id,
        likedList:    likes.likes               // whole array
  });

        return (
          <div className="card" key={a._id}>
           
            {editMode && (
              <button
                className="delete-icon"
                onClick={() => onDelete(a._id)}
                aria-label="Delete activity"
              >
                ✕
              </button>
            )}

        
            {a.imageURL && (
              <img src={a.imageURL} alt={a.title} className="card-img" />
            )}

            
            <h2 className="card-title">{a.title}</h2>
            <p className="card-text">{a.description}</p>

            
            {!editMode && (
              <button
                className="favorite-icon"
                onClick={() => likes.toggle(a.countrySlug, a._id)}
                aria-label={liked ? "Unlike" : "Like"}
              >
                {liked ? <FaHeart style={{ color: "crimson" }} /> : <FaRegHeart />}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}