import React from 'react';
import './ServicesSection.css';

const ServicesSection = () => {
  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Digital Visualization</h3>
            <p>3D modeling, renderings, and interactive design tools to preview your space transformation.</p>
          </div>
          <div className="service-card">
            <h3>Architectural Planning</h3>
            <p>Thoughtful and efficient design plans that reflect the client’s vision and meet building codes.</p>
          </div>
          <div className="service-card">
            <h3>Construction & Build</h3>
            <p>From permits to execution — our team brings the plans to life with care and precision.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
