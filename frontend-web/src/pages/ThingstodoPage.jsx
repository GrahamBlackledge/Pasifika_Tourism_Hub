import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../components/context/AuthContext";

import FlagSidebar       from "../components/FlagSidebar/FlagSidebar";
import CountryActivities from "../components/CountryActivities/CountryActivities";
import { getCountry, deleteActivity } from "../services/api";
import "./ThingstodoPage.css";

import samoaFlag from "../assets/flags/sa.png";
import fijiFlag  from "../assets/flags/fi.png";
import tongaFlag from "../assets/flags/to.png";

/* ──────────────────────────────────────────────────────────── */

const COUNTRIES = [
  {
    slug: "samoa",
    name: "Samoa",
    flag: samoaFlag,
    description: "Enjoy Samoa’s natural beauty with a blend of beach and cultural activities.",
  },
  {
    slug: "fiji",
    name: "Fiji",
    flag: fijiFlag,
    description: "Enjoy Fiji’s natural beauty with a blend of beach and cultural activities.",
  },
  {
    slug: "tonga",
    name: "Tonga",
    flag: tongaFlag,
    description: "Enjoy Tonga’s natural beauty with a blend of beach and cultural activities.",
  },
];

/* ──────────────────────────────────────────────────────────── */

export default function ThingsToDoPage() {
  /* route + navigation */
  const { country: urlSlug } = useParams();
  const navigate             = useNavigate();

  /* auth */
  const { currentUser, isAdmin, loading: authLoading } = useAuth(); // ← add loading flag

  /* page-level state */

  const initialSlug = COUNTRIES.some(c => c.slug === urlSlug) ? urlSlug : "samoa";
  const [selectedSlug, setSelectedSlug] = useState(initialSlug);

  const [editMode, setEditMode] = useState(false);
  const [activities, setActivities] = useState([]);   // always an array
  const [loading, setLoading]       = useState(true); // country-data loading

  /* ───── delete handler (admin only) ───── */
  const handleDelete = async (activityId) => {
    try {
      await deleteActivity(selectedSlug, activityId);
      setActivities(prev => prev.filter(a => a._id !== activityId));
    } catch (err) {
      console.error("Failed to delete activity:", err);
      alert("Sorry, something went wrong.");
    }
  };

  /* ───── keep URL + sidebar selection in sync ───── */
  useEffect(() => {
    if (urlSlug !== selectedSlug) {
      const exists = COUNTRIES.some(c => c.slug === urlSlug);
      if (exists) setSelectedSlug(urlSlug);
      else navigate("/samoa/things-to-do", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSlug]);

  /* ───── fetch activities when country changes ───── */
  useEffect(() => {
    setLoading(true);
    getCountry(selectedSlug)
      .then(res => {
        const acts = res.data.exploration?.activities || [];
        /*  IMPORTANT: attach countrySlug for likes API  */
        setActivities(acts.map(a => ({ ...a, countrySlug: selectedSlug })));
      })
      .catch(err => {
        console.error(err);
        setActivities([]);
      })
      .finally(() => setLoading(false));
  }, [selectedSlug]);

  const handleSelect = slug => navigate(`/${slug}/things-to-do`);
  const activeCountry = COUNTRIES.find(c => c.slug === selectedSlug);

  /* ─────  WAIT for Firebase auth  ───── */
  if (authLoading) return null;           // or a spinner

  return (
    <div className="page-layout">
      <FlagSidebar
        countries={COUNTRIES}
        selectedCountry={selectedSlug}
        onSelect={handleSelect}
      />

      <div className="main-content">
        {loading ? (
          <p>Loading activities…</p>
        ) : (
          <>
            {/* country header */}
            <div className="country-header">
              <h1>{activeCountry.name}</h1>
              <p>{activeCountry.description}</p>

              {/* admin buttons */}
              {isAdmin && (
                <div className="btn-row">
                  <button
                    className="admin-btn"
                    onClick={() => navigate(`/admin/add-activity/${selectedSlug}`)}
                  >
                    + Add
                  </button>

                  <button
                    className="admin-btn"
                    onClick={() => setEditMode(prev => !prev)}
                  >
                    {editMode ? "Done" : "Delete"}
                  </button>
                </div>
              )}
            </div>

            {/* cards */}
            <CountryActivities
              activities={activities}
              editMode={editMode}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  );
}
