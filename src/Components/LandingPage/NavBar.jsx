import React from "react";
import "./NavBar.css";

function NavBar({ onLogin, onSignUp }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">TWENITU</div>
      <ul className="navbar-links">
        <li><a href="#banner">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="navbar-buttons">
        <button className="login-btn" onClick={onLogin}>Log In</button>
        <button className="signup-btn" onClick={onSignUp}>Sign Up</button>
      </div>
    </nav>
  );
}

export default NavBar;
