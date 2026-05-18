import React from 'react';
import { rohitData } from '../data/rohitData';
import '../styles/StatsSection.css';

const StatsSection: React.FC = () => {
  const { stats } = rohitData;

  return (
    <section id="stats" className="stats-section">
      <div className="container">
        <h2>Career Statistics</h2>
        <div className="stats-grid">
          {/* Test Stats */}
          <div className="stats-card">
            <h3>Test</h3>
            <div className="stat-item"><span>Matches</span><span>{stats.test.matches}</span></div>
            <div className="stat-item"><span>Runs</span><span>{stats.test.runs}</span></div>
            <div className="stat-item"><span>Avg</span><span>{stats.test.average}</span></div>
            <div className="stat-item"><span>100s/50s</span><span>{stats.test.centuries}/{stats.test.fifties}</span></div>
          </div>

          {/* ODI Stats */}
          <div className="stats-card highlight">
            <h3>ODI</h3>
            <div className="stat-item"><span>Matches</span><span>{stats.odi.matches}</span></div>
            <div className="stat-item"><span>Runs</span><span>{stats.odi.runs}</span></div>
            <div className="stat-item"><span>Highest</span><span className="record">{stats.odi.highest}</span></div>
            <div className="stat-item"><span>100s/50s</span><span>{stats.odi.centuries}/{stats.odi.fifties}</span></div>
          </div>

          {/* T20I Stats */}
          <div className="stats-card">
            <h3>T20I</h3>
            <div className="stat-item"><span>Matches</span><span>{stats.t20i.matches}</span></div>
            <div className="stat-item"><span>Runs</span><span>{stats.t20i.runs}</span></div>
            <div className="stat-item"><span>S/R</span><span>{stats.t20i.strikeRate}</span></div>
            <div className="stat-item"><span>100s</span><span>{stats.t20i.centuries}</span></div>
          </div>

          {/* IPL Stats */}
          <div className="stats-card">
            <h3>IPL</h3>
            <div className="stat-item"><span>Matches</span><span>{stats.ipl.matches}</span></div>
            <div className="stat-item"><span>Runs</span><span>{stats.ipl.runs}</span></div>
            <div className="stat-item"><span>100s/50s</span><span>{stats.ipl.centuries}/{stats.ipl.fifties}</span></div>
            <div className="stat-item"><span>Titles</span><span>5</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
