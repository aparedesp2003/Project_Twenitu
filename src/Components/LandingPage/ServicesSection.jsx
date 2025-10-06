import React from "react";
import "./ServicesSection.css";
import DigitalImage from "../Images/AFTER 1.jpg";
import BuildImage from "../Images/FLYER 2.png";

const ServicesSection = () => {
  return (
    <section className="services-section" id="services">
      <h2>Our Services</h2>
      <div className="services-container">
        <div className="service-card">
          <img src={DigitalImage} alt="Twenitu Digital" className="service-image" />
          <h3>Twenitu Digital</h3>
          <p>
            - Helping professionals involved in the construction industry; direct and indirect, understand their spaces.
          </p>
          <p>
            - Enhancing the production workflow by integrating a variety of products that help stakeholders take better and faster decisions
          </p>
        </div>
        <div className="service-card">
          <img src={BuildImage} alt="Twenitu Build" className="service-image" />
          <h3>Twenitu Build</h3>
          <p>
            Thoughtful and efficient design plans that reflect the client’s vision
            and meet building codes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
