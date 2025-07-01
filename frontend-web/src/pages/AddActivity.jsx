import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./AddCountry.css";      

export default function AddActivity() {

  const { slug } = useParams();   
  const [formData, setFormData] = useState({
    
    slug: "",      
    title: "",
    description: "",
    imageURL: "",
    liked: false
  });

   useEffect(() => {
    setFormData(prev => ({ ...prev, slug }));
  }, [slug]);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const { slug, ...activity } = formData;

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/countries/slug/${slug}/activities`,
        activity
      );

      console.log("Activity added:", res.data);
      alert("Activity added successfully!");
    } catch (err) {
      console.error("Error adding activity:", err.response?.data || err.message);
      alert("Failed to add activity");
    }
  };


  return (
    <div className="pageWrapper">
      <form className="formContainer" onSubmit={handleSubmit}>
        <input
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Country"
          required
        />
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Activity title"
          required
        />
        <input
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Short description"
        />
        <button type="submit">Add Activity</button>
      </form>
    </div>
  );
}
