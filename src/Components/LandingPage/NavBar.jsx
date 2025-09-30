import React from "react";
import "./NavBar.css";
import logo from "../Images/Logo_PRINCIPAL-OFF-WHITE.png";

const NavBar = ({ onLogin, onSignUp }) => {
  // scroll to top when logo or name is clicked
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      {/* Left: Logo + brand */}
      <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <img src={logo} alt="Twenitu Logo" className="logo-img" />
        <span className="company-name">Twenitu</span>
      </div>

      {/* Center: Navigation links */}
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      {/* Right: Auth buttons */}
      <div className="nav-auth">
        <button className="login-btn" onClick={onLogin}>Login</button>
        <button className="signup-btn" onClick={onSignUp}>Sign Up</button>
      </div>
    </nav>
  );
};

export default NavBar;
