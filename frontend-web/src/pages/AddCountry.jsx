import { useState } from "react";
import axios from "axios";
import  "./AddCountry.css";

export default function AddCountry() {
  const [formData, setFormData] = useState({
    countryName: "",
    slug: "",
    intro: "",
    history: "",
    flagUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/countries",
        formData
      );
      console.log("Country added: ", response.data);
    } catch (err) {
      console.error("Error adding country:", err.response?.data || err.message);
    }
  };

  return (
    <div className="pageWrapper">
     <form className="formContainer" onSubmit={handleSubmit}>
        <input
          name="countryName"
          value={formData.countryName}
          onChange={handleChange}
          placeholder="Country Name"
        />
        <input
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Slug (e.g. samoa)"
        />
        <input
          name="intro"
          value={formData.intro}
          onChange={handleChange}
          placeholder="Short Intro"
        />
        <textarea
          name="history"
          value={formData.history}
          onChange={handleChange}
          placeholder="History"
        />
        <input
          name="flagUrl"
          value={formData.flagUrl}
          onChange={handleChange}
          placeholder="Flag Image URL"
        />
        <button type="submit">Add Country</button>
      </form>
    </div>
  );
}
