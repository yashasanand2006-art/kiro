import React from 'react';
import '../styles/Hero.css';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="fade-in">ROHIT SHARMA</h1>
        <p className="subtitle fade-in">The Hitman of Indian Cricket</p>
        <div className="cta-buttons fade-in">
          <a href="#stats" className="btn btn-primary">View Stats</a>
          <a href="#records" className="btn btn-secondary">His Records</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
