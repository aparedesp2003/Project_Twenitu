import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">TWENITU</div>
        <div className="navbar-links">
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Products</a>
          <a href="#">Projects</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
