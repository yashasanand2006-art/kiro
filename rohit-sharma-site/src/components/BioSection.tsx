import React from 'react';
import { rohitData } from '../data/rohitData';
import '../styles/BioSection.css';

const BioSection: React.FC = () => {
  return (
    <section id="bio" className="bio-section">
      <div className="container">
        <h2>The Legend</h2>
        <div className="bio-grid">
          <div className="bio-image">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Rohit_Sharma_July_2019.jpg/800px-Rohit_Sharma_July_2019.jpg" alt="Rohit Sharma" />
          </div>
          <div className="bio-text">
            <h3>Who is {rohitData.name}?</h3>
            <p className="role">{rohitData.role}</p>
            <p className="description">{rohitData.biography}</p>
            <div className="personal-info">
              <p><strong>Born:</strong> {rohitData.birthDate}</p>
              <p><strong>Place:</strong> {rohitData.birthPlace}</p>
              <p><strong>Nickname:</strong> {rohitData.nickname}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
