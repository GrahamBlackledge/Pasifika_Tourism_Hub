import React from 'react'
import YouTube from 'react-youtube';
import './KidsPage.css';

const KidsPage = () => {
  return (
    <div className="kids-page">
      <h2 className="kids-heading">KIDS</h2>
      
      <div className="video-container">
        <YouTube videoId="gl25ln8vIkA" className="youtube-video" />
        <YouTube videoId="79DijItQXMM" className="youtube-video" />
      </div>
      <div className="extra-content">
        <div className="rectangle">
            Play our new Pasifika game!!
        </div>
        <div className="circle">
            Top 10<br />
            Island Activities<br />
            For Kids!
        </div>
        </div>
    </div>
  );
};

export default KidsPage;