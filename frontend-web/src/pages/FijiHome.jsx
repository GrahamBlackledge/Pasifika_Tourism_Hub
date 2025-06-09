import HeroCarousel from '../components/HeroCarousel/HeroCarousel';
import SectionCard  from '../components/SectionCard/SectionCard';  

import hero1 from '../assets/images/FijiCarousel1.jpg';
import hero2 from '../assets/images/FijiCarousel2.jpg';
import hero3 from '../assets/images/FijiCarousel3.jpeg';

import actImg  from '../assets/images/FijiActivity.jpg';
import histImg from '../assets/images/FijiHistory.jpg';
import langImg from '../assets/images/FijiLanguage.png';

import '../styles/CountryPage.css';   
export default function FijiHome() {
  return (
    <div className="page-section">
      <h2 className="country-title">Fiji</h2>

      <HeroCarousel images={[hero1, hero2, hero3]} alt="Beautiful Fijian scenery" />

      <div className="section-grid">
        <SectionCard title="Activities" image={actImg}  link="/fiji/activities" />
        <SectionCard title="History"    image={histImg} link="/fiji/history"    />
        <SectionCard title="Language"   image={langImg} link="/fiji/language"   />
      </div>
    </div>
  );
}
