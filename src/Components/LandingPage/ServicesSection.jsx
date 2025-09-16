import React from 'react';
import './ServicesSection.css';

const ServicesSection = () => {
  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Twenitu Digital</h3>
            <p>3D modeling, renderings, and interactive design tools to preview your space transformation.</p>
          </div>
          <div className="service-card">
            <h3>Twenitu Build</h3>
            <p>Thoughtful and efficient design plans that reflect the client’s vision and meet building codes.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
