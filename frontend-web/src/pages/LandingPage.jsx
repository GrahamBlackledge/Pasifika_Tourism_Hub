import React from 'react'
import HeroSection   from '../components/HeroSection/HeroSection';
import CountryCard   from '../components/CountryCard/CountryCard';

import samoaImg from '../assets/images/samoa.jpg';
import fijiImg  from '../assets/images/fiji.jpeg';
import tongaImg from '../assets/images/tonga.jpg';

import samoaFlag from '../assets/flags/sa.png';
import fijiFlag  from '../assets/flags/fi.png';
import tongaFlag from '../assets/flags/to.png';


export default function LandingPage() {
  const countries = [
  { name: 'Samoa',  image: samoaImg, flag: samoaFlag, href: '/samoa'},
  { name: 'Fiji',  image: fijiImg, flag: fijiFlag, href: '/fiji'},
  { name: 'Tonga',  image: tongaImg, flag: tongaFlag, href: '/tonga'},
];

  return (
    <>
      <HeroSection />
      {countries.map(c => (
        <CountryCard key={c.name} {...c} />
      ))}
    </>
  );
}