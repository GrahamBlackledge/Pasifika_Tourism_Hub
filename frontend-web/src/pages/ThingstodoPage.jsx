import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../components/context/AuthContext';


import FlagSidebar        from '../components/FlagSidebar/FlagSidebar';
import CountryActivities  from '../components/CountryActivities/CountryActivities';
import { getCountry } from '../services/api';
import './ThingstodoPage.css'
import { deleteActivity } from '../services/api';

import samoaFlag from '../assets/flags/sa.png';
import fijiFlag  from '../assets/flags/fi.png';
import tongaFlag from '../assets/flags/to.png';



const COUNTRIES = [
  {
    slug: 'samoa',
    name: 'Samoa',
    flag: samoaFlag,
    description:
      'Enjoy Samoa’s natural beauty with a blend of beach and cultural activities.',
  },
  {
    slug: 'fiji',
    name: 'Fiji',
    flag: fijiFlag,
    description:
      'Enjoy Fiji’s natural beauty with a blend of beach and cultural activities.',
      },
  {
    slug: 'tonga',
    name: 'Tonga',
    flag: tongaFlag,
    description:
      'Enjoy Tonga’s natural beauty with a blend of beach and cultural activities.',
      },
];


export default function ThingsToDoPage() {
  const { country: urlSlug } = useParams();  
  const navigate             = useNavigate();
  const [editMode, setEditMode] = useState(false);
   const { isAdmin } = useAuth(); 
  

  
  const initialSlug = COUNTRIES.some(c => c.slug === urlSlug) ? urlSlug : 'samoa';
  const [selectedSlug, setSelectedSlug] = useState(initialSlug);

  const [activities, setActivities] = useState([]); 
  const [loading, setLoading]       = useState(true);

  const handleDelete = async (activityId) => {
  try {
    await deleteActivity(selectedSlug, activityId);

    
    setActivities(prev => prev.filter(a => a._id !== activityId));
  } catch (err) {
    console.error('Failed to delete activity:', err);
    alert('Sorry, something went wrong.');
  }
};


  
  useEffect(() => {
    if (urlSlug !== selectedSlug) {
      const exists = COUNTRIES.some(c => c.slug === urlSlug);
      if (exists) setSelectedSlug(urlSlug);
      else navigate('/samoa/things-to-do', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSlug]);

   useEffect(() => {
    setLoading(true);                              
    getCountry(selectedSlug)                        
      .then(res => {
        const acts = res.data.exploration?.activities || [];
        setActivities(acts);
      })
      .catch(err => {
        console.error(err);
        setActivities([]);
      })
      .finally(() => setLoading(false));         
  }, [selectedSlug]);   

  const handleSelect = slug => navigate(`/${slug}/things-to-do`);

  const activeCountry = COUNTRIES.find(c => c.slug === selectedSlug);

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
      
      <div className="country-header">
        <h1>{activeCountry.name}</h1>
        <p>{activeCountry.description}</p>

        
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
                    onClick={() => setEditMode(!editMode)}
                  >
                    {editMode ? 'Done' : 'Delete'}
                  </button>
                </div>
              )}
            </div>

      
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
