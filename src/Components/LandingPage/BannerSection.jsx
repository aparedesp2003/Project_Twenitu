import React from "react";
import './BannerSection.css';
import transitionVideo from '../Images/LOGO MOTION - SAGE GRAY BACKGROUND-Horizontal.mp4';

const BannerSection = () => {
  const handleCTAClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="banner" id="banner">
      {/* Background Video */}
      <video
        className="banner-video"
        src={transitionVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Content on top */}
      <div className="banner-content">
        <h1>Your Space matters. Let's Build meaning.</h1>
        <p>Scan | Model | Show | Reimagine</p>
        <button onClick={handleCTAClick} className="cta-button">
          Contact Us
        </button>
      </div>
    </section>
  );
};

export default BannerSection;
