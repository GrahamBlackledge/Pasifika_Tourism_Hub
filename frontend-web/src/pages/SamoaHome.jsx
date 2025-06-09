
import HeroCarousel from '../components/HeroCarousel/HeroCarousel';
import SectionCard  from '../components/SectionCard/SectionCard';  

import hero1 from '../assets/images/SamoaCarousel1.png';
import hero2 from '../assets/images/SamoaCarousel2.png';
import hero3 from '../assets/images/SamoaCarousel3.png';

import actImg  from '../assets/images/SamoaActivity3.png';
import histImg from '../assets/images/SamoaActivity2.png';
import langImg from '../assets/images/SamoaActivity1.jpg';

import '../styles/CountryPage.css';   
export default function SamoaHome() {
  return (
    <div className="page-section">
      <h2 className="country-title">Samoa</h2>

      <HeroCarousel images={[hero1, hero2, hero3]} alt="Beautiful Samoa scenery" />

      <div className="section-grid">
        <SectionCard title="Activities" image={actImg}  link="/samoa/activities" />
        <SectionCard title="History"    image={histImg} link="/samoa/history"    />
        <SectionCard title="Language"   image={langImg} link="/samoa/language"   />
      </div>
    </div>
  );
}

                     