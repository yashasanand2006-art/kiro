import React from 'react';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <div className="logo">HITMAN 45</div>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#bio">Biography</a></li>
          <li><a href="#stats">Stats</a></li>
          <li><a href="#records">Records</a></li>
          <li><a href="#gallery">Gallery</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
