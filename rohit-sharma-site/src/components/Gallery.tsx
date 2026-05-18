import React from 'react';
import { rohitData } from '../data/rohitData';
import '../styles/Gallery.css';

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <h2>Photo Gallery</h2>
        <div className="gallery-grid">
          {rohitData.gallery.map((item, index) => (
            <div key={index} className="gallery-item">
              <img src={item.url} alt={item.caption} />
              <div className="gallery-caption">{item.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
