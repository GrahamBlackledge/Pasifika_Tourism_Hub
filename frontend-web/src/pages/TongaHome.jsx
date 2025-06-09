
import HeroCarousel from '../components/HeroCarousel/HeroCarousel';
import SectionCard  from '../components/SectionCard/SectionCard';  

import hero1 from '../assets/images/TongaCarousel1.jpg';
import hero2 from '../assets/images/TongaCarousel2.jpg';
import hero3 from '../assets/images/TongaCarousel3.jpg';

import actImg  from '../assets/images/TongaActivity.jpg';
import histImg from '../assets/images/TongaHistory.jpg';
import langImg from '../assets/images/TongaLanguage.jpg';

import '../styles/CountryPage.css';   
export default function TongaHome() {
  return (
    <div className="page-section">
      <h2 className="country-title">Tonga</h2>

      <HeroCarousel images={[hero1, hero2, hero3]} alt="Beautiful Tonga scenery" />

      <div className="section-grid">
        <SectionCard title="Activities" image={actImg}  link="/tonga/activities" />
        <SectionCard title="History"    image={histImg} link="/tonga/history"    />
        <SectionCard title="Language"   image={langImg} link="/tonga/language"   />
      </div>
    </div>
  );
}
