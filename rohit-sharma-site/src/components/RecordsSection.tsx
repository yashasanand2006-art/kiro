import React from 'react';
import { rohitData } from '../data/rohitData';
import '../styles/RecordsSection.css';

const RecordsSection: React.FC = () => {
  return (
    <section id="records" className="records-section">
      <div className="container">
        <h2>Hall of Fame Records</h2>
        <div className="records-list">
          {rohitData.records.map((record, index) => (
            <div key={index} className="record-card fade-in">
              <div className="record-icon">🏆</div>
              <p>{record}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecordsSection;
