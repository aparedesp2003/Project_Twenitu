import React from "react";
import './BannerSection.css';


const BannerSection = () => {
  const handleCTAClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="banner" id="banner">
      <div className="banner-content">
        <h1>We build meaning where construction meets tecnología</h1>
        <p>Scan | Model | Show | Reimagine</p>
        <button onClick={handleCTAClick} className="cta-button">
          Contact Us
        </button>
      </div>
    </section>
  );
};

export default BannerSection;