import { useState } from 'react';
import './HeroCarousel.css';   
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 

export default function HeroCarousel({ images, alt }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((idx - 1 + images.length) % images.length);
  const next = () => setIdx((idx + 1) % images.length);

  return (
    <div className="hero-wrap">
      <img src={images[idx]} alt={alt} />

      <button className="hero-btn hero-btn--left"  onClick={prev}><FaChevronLeft /></button>
      <button className="hero-btn hero-btn--right" onClick={next}><FaChevronRight /></button>
    </div>
  );
}
